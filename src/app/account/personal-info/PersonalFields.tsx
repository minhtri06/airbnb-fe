'use client'

import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import Button from '@/components/buttons/Button'
import useAuthStore from '@/stores/useAuthStore'
import { useRef, useState } from 'react'
import useOutSideListener from '@/hooks/useOutSideListener'
import ErrorText from '@/components/ErrorText'
import useAuthAxios from '@/hooks/useAuthAxios'
import pickFields from '@/utils/pickFields'
import axios from 'axios'

const PersonalFields = () => {
  const { currentUser, setCurrentUser } = useAuthStore()
  const authAxios = useAuthAxios()

  const [name, setName] = useState(currentUser?.name || '')
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || null,
  )
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    currentUser?.dateOfBirth || null,
  )
  const [gender, setGender] = useState<null | 'male' | 'female'>(
    currentUser?.gender || null,
  )
  const [isPickingDateOfBirth, setIsPickingDateOfBirth] = useState(false)
  const [error, setError] = useState('')
  const [notificationMsg, setNotificationMsg] = useState('')

  const calendarRef = useRef(null)
  useOutSideListener('mousedown', [calendarRef], () => {
    setIsPickingDateOfBirth(false)
  })

  const handleSave = async () => {
    if (!currentUser) return

    setNotificationMsg('')
    authAxios
      .patch('/me', { name, gender, dateOfBirth, phoneNumber })
      .then(() => {
        setError('')
        setCurrentUser({
          ...currentUser!,
          name,
          gender,
          dateOfBirth,
          phoneNumber,
        })
        setNotificationMsg('Update successfully')
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data)
          setError(error.response?.data.message)
          setNotificationMsg('')
        }
      })
  }

  return (
    <div className="pt-3">
      <div className="py-5">
        <div className="font-bold">Name</div>
        <input
          value={name || ''}
          onChange={(e) => setName(e.currentTarget.value)}
          className="outline-none border-b-[1px] w-full py-2"
        />
      </div>

      <div className="py-4">
        <div className="font-bold">Phone number</div>
        <input
          value={phoneNumber || ''}
          onChange={(e) => {
            let value: string | null = e.currentTarget.value.replace(/\D/g, '')
            if (value === '') value = null
            setPhoneNumber(value)
          }}
          className="outline-none border-b-[1px] w-full py-2"
        />
      </div>

      <div className="py-4 relative">
        <div className="font-bold">Date of birth</div>
        <div
          className="border-b-[1px] w-40 py-2 cursor-pointer"
          onClick={() => setIsPickingDateOfBirth(true)}
        >
          {dateOfBirth ? (
            <span>{dateOfBirth?.toLocaleDateString()}</span>
          ) : (
            <span>-- / -- / --</span>
          )}
        </div>
        {isPickingDateOfBirth && (
          <div ref={calendarRef} className="absolute z-10">
            <Calendar
              onChange={(date) => setDateOfBirth(date)}
              maxDate={new Date()}
            />
          </div>
        )}
      </div>
      <div className="py-4">
        <div className="font-bold">Gender</div>
        <div className="flex gap-3 mt-3">
          <div
            className={`border-[1px] rounded-md py-1 w-20 flex justify-center 
              cursor-pointer select-none text-gray-500
              ${
                gender === 'male' &&
                'border-gray-700 border-[2px] text-gray-800'
              }`}
            onClick={() => setGender('male')}
          >
            Male
          </div>
          <div
            className={`border-[1px] rounded-md py-1 w-20 flex justify-center 
              cursor-pointer select-none text-gray-500
              ${
                gender === 'female' &&
                'border-gray-700 border-[2px] text-gray-800'
              }`}
            onClick={() => setGender('female')}
          >
            Female
          </div>
        </div>
      </div>
      <ErrorText error={error} />
      <div className="h-5">{notificationMsg}</div>
      <div className="w-36 mt-5">
        <Button label="Save profile" onClick={handleSave} black />
      </div>
    </div>
  )
}

export default PersonalFields
