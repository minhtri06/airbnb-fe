'use client'

import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import useRegisterModal from '@/hooks/contexts/useRegisterModal'
import Modal from './Modal'
import useAuth from '@/hooks/useAuth'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../Button'
import validateRequire from '@/utils/validateRequire'
import useNotificationModal from '@/hooks/contexts/useNotificationModal'
import ErrorText from '../ErrorText'
import getGoogleOauthUrl from '@/utils/getGoogleOauthUrl'
import axios from 'axios'

function RegisterModal() {
  const modal = useRegisterModal()
  const notificationModal = useNotificationModal()

  const auth = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    passwordConfirm?: string
    general?: string
  }>({})

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const errs = validateRequire(
      { name, email, password, passwordConfirm },
      'name',
      'email',
      'password',
      'passwordConfirm',
    )
    if (errs !== null) {
      return errs
    }
    if (password !== passwordConfirm) {
      return { passwordConfirm: 'Password does not match' }
    }
    return null
  }

  const onSubmit = async () => {
    setIsLoading(true)
    setErrors({})

    const errs = validateForm()
    if (errs !== null) {
      setTimeout(() => {
        setErrors(errs)
      }, 300)
    } else {
      try {
        await auth.register({ name, email, password })
        modal.close()

        notificationModal.open(
          'Verify your email',
          <div className="text-base flex flex-col items-center">
            <Image
              height={120}
              width={120}
              src="/img/email.png"
              alt="email-image"
              className="mb-3"
            />
            <div className="text-center">
              {`Thank you for joining us. We sent an verification email to '${email}' to verify your email address and active your account`}
            </div>
          </div>,
        )
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setErrors((pre) => ({ ...pre, general: error.response.data.message }))
        } else {
          console.log(error)
        }
      }
    }
    setIsLoading(false)
  }

  const bodyElement = (
    <div className="flex flex-col gap-3">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <div className="pb-2">
        <ErrorText error={errors.general} small />
      </div>
      <Input
        label="Name"
        value={name}
        onChange={(e) => {
          setErrors((pre) => ({ ...pre, name: undefined }))
          setName(e.currentTarget.value)
        }}
        error={errors.name}
        disabled={isLoading}
      />
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => {
          setErrors((pre) => ({ ...pre, email: undefined }))
          setEmail(e.currentTarget.value)
        }}
        error={errors.email}
        disabled={isLoading}
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => {
          setErrors((pre) => ({ ...pre, password: undefined }))
          setPassword(e.currentTarget.value)
        }}
        error={errors.password}
        disabled={isLoading}
      />
      <Input
        type="password"
        label="Confirm password"
        value={passwordConfirm}
        onChange={(e) => {
          setErrors((pre) => ({ ...pre, passwordConfirm: undefined }))
          setPasswordConfirm(e.currentTarget.value)
        }}
        error={errors.passwordConfirm}
        disabled={isLoading}
      />
    </div>
  )

  const footerElement = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          router.push(getGoogleOauthUrl())
        }}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <>
      <Modal
        isForm
        disabled={isLoading}
        isOpen={modal.isOpen}
        title="Register"
        actionLabel="Continue"
        action={() => {
          onSubmit()
        }}
        onClose={() => modal.close()}
        body={bodyElement}
        footer={footerElement}
      />
    </>
  )
}

export default RegisterModal