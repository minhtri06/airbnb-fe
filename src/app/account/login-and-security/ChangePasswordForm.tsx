'use client'

import ErrorText from '@/components/ErrorText'
import Button from '@/components/buttons/Button'
import useAuthAxios from '@/hooks/useAuthAxios'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ChangePasswordFormProps {
  isPasswordChanging: boolean
  setIsPasswordChanging: Dispatch<SetStateAction<boolean>>
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  isPasswordChanging,
  setIsPasswordChanging,
}) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [notificationMsg, setNotificationMsg] = useState('')

  const authAxios = useAuthAxios()

  const validateForm = () => {
    if (oldPassword === '') return 'Old password is required'
    if (newPassword === '') return 'New password is required'
    if (newPasswordConfirm === '') return 'Confirm password is required'
    if (newPassword !== newPasswordConfirm)
      return "Confirm password doesn't match"
    return null
  }

  const handleChangePassword = () => {
    const errMsg = validateForm()
    if (errMsg) {
      setError(errMsg)
      setNotificationMsg('')
      return
    }
    authAxios
      .post('/auth/change-password', {
        oldPassword,
        newPassword,
      })
      .then(() => {
        setError('')
        setNotificationMsg('Change password successfully')
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message)
          setNotificationMsg('')
        }
      })
  }

  useEffect(() => {
    setError('')
    setNotificationMsg('')
  }, [oldPassword, newPassword, newPasswordConfirm])

  return (
    <div className="mt-5 border-[1px] p-5 rounded-lg">
      <div className="font-bold">Old password</div>
      <input
        type="password"
        className="outline-none py-2 border-b-[1px]"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.currentTarget.value)}
      />
      <div className="font-bold mt-5">New password</div>
      <input
        type="password"
        className="outline-none py-2 border-b-[1px]"
        value={newPassword}
        onChange={(e) => setNewPassword(e.currentTarget.value)}
      />
      <div className="font-bold mt-5">Confirm new password</div>
      <input
        type="password"
        className="outline-none py-2 border-b-[1px]"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.currentTarget.value)}
      />
      <div className="mt-5">
        <ErrorText error={error} />
        <div className="h-5">{notificationMsg}</div>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-32">
          <Button
            label="Cancel"
            onClick={() => setIsPasswordChanging(false)}
            black
            small
          />
        </div>
        <div className="w-44">
          <Button
            label="Change password"
            onClick={handleChangePassword}
            outline
            small
          />
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordForm
