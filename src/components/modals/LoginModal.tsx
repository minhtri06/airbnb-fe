'use client'

import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../Button'
import validateRequire from '@/utils/validateRequire'
import useAuth from '@/hooks/useAuth'
import useLoginModal from '@/hooks/contexts/useLoginModal'
import useRegisterModal from '@/hooks/contexts/useRegisterModal'
import ErrorText from '../ErrorText'

function LoginModal() {
  const modal = useLoginModal()

  const auth = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})

  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    return validateRequire({ email, password }, 'email', 'password')
  }

  const onSubmit = async () => {
    setIsLoading(true)
    setErrors({})

    const errors = validateForm()
    if (errors !== null) {
      setTimeout(() => {
        setErrors(errors)
      }, 300)
    } else {
      const { res, err } = await auth.login(email, password)

      if (err && err.isFetchError && res) {
        const status = res.status
        // If client error
        if (status >= 400 && status < 500) {
          setErrors((pre) => ({ ...pre, general: err.message }))
        }
      } else {
        modal.close()
      }
    }
    ;('object')
    setIsLoading(false)
  }

  const bodyElement = (
    <div className="flex flex-col gap-3">
      <Heading title="Welcome back" subtitle="Login to your account" />
      {errors.general && (
        <div className="pb-2">
          <ErrorText error={errors.general} small />
        </div>
      )}
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
    </div>
  )

  const footerElement = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={modal.isOpen}
        title="Login"
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

export default LoginModal
