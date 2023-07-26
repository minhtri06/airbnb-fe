'use client'

import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'

import useRegisterModal from '@/hooks/contexts/useRegisterModal'
import Modal from './Modal'
import useAuth from '@/hooks/useAuth'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../Button'
import validateRequire from '@/utils/validateRequire'
import useCurrentUser from '@/hooks/contexts/useCurrentUser'
import axios, { AxiosError } from 'axios'
import { BASE_URL, REGISTER_URL } from '@/constants/urls'

function RegisterModal() {
  const modal = useRegisterModal()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [validateErrors, setValidateErrors] = useState<{
    name?: string
    email?: string
    password?: string
    passwordConfirm?: string
  }>({})

  const [isLoading, setIsLoading] = useState(false)

  const auth = useAuth()
  const { setCurrentUser } = useCurrentUser()

  const validateForm = () => {
    const errors = validateRequire(
      { name, email, password, passwordConfirm },
      'name',
      'email',
      'password',
      'passwordConfirm',
    )
    if (errors !== null) {
      return errors
    }
    if (password !== passwordConfirm) {
      return { passwordConfirm: 'Password does not match' }
    }
    return null
  }

  const onSubmit = async () => {
    setIsLoading(true)
    setValidateErrors({})

    const errors = validateForm()
    if (errors !== null) {
      setTimeout(() => {
        setValidateErrors(errors)
      }, 300)
    } else {
      try {
        const apiAxios = axios.create({
          baseURL: BASE_URL,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const res = await apiAxios.post(REGISTER_URL, { name, email, password })
        modal.close()
        setCurrentUser(res.data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data)
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
      <Input
        label="Name"
        value={name}
        onChange={(e) => {
          setValidateErrors((pre) => ({ ...pre, name: undefined }))
          setName(e.currentTarget.value)
        }}
        error={validateErrors.name}
      />
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => {
          setValidateErrors((pre) => ({ ...pre, email: undefined }))
          setEmail(e.currentTarget.value)
        }}
        error={validateErrors.email}
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => {
          setValidateErrors((pre) => ({ ...pre, password: undefined }))
          setPassword(e.currentTarget.value)
        }}
        error={validateErrors.password}
      />
      <Input
        type="password"
        label="Confirm password"
        value={passwordConfirm}
        onChange={(e) => {
          setValidateErrors((pre) => ({ ...pre, passwordConfirm: undefined }))
          setPasswordConfirm(e.currentTarget.value)
        }}
        error={validateErrors.passwordConfirm}
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
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={() => {}}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <>
      <Modal
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
