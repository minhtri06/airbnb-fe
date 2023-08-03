'use client'

import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import axios from 'axios'

import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../buttons/Button'
import validateRequire from '@/utils/validateRequire'
import useAuthService from '@/hooks/useAuthService'
import useLoginModalStore from '@/hooks/contexts/useLoginModalStore'
import ErrorText from '../ErrorText'
import { useRouter } from 'next/navigation'
import getGoogleOauthUrl from '@/utils/getGoogleOauthUrl'
import GoogleLoginButton from '../buttons/GoogleLoginButton'

function LoginModal() {
  const modal = useLoginModalStore()

  const auth = useAuthService()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})

  const clearForm = () => {
    setEmail('')
    setPassword('')
    setErrors({})
  }

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
      try {
        await auth.login(email, password)
        modal.close()
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
      <Heading title="Welcome back" subtitle="Login to your account" />
      {errors.general && (
        <div className="pb-2">
          <ErrorText error={errors.general} size="small" />
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
      <GoogleLoginButton disabled={isLoading} />
    </div>
  )

  return (
    <>
      <Modal
        isForm
        disabled={isLoading}
        isOpen={modal.isOpen}
        title="Login"
        actionLabel="Continue"
        action={() => {
          onSubmit()
        }}
        onClose={() => {
          clearForm()
          modal.close()
        }}
        body={bodyElement}
        footer={footerElement}
      />
    </>
  )
}

export default LoginModal
