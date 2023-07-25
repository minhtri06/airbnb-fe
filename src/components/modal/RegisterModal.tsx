'use client'

import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from '@/hooks/contexts/useRegisterModal'
import usePrivateAxios from '@/hooks/usePrivateAxios'

function RegisterModal() {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const {} = usePrivateAxios()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  })

  return <div>RegisterModal</div>
}

export default RegisterModal
