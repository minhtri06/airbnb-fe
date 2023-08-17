'use client'

import Avatar from '@/components/Avatar'
import useAuthAxios from '@/hooks/useAuthAxios'
import useAuthStore from '@/stores/useAuthStore'
import { useState } from 'react'

const PersonalAvatar = () => {
  const { currentUser, setCurrentUser } = useAuthStore()
  const authAxios = useAuthAxios()

  const handleEditAvatar = (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    authAxios
      .put('/me/avatars', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (!currentUser) return
        setCurrentUser({ ...currentUser, avatar: res.data.avatar })
      })
  }

  return (
    <div className="relative w-fit">
      <Avatar avatarUrl={currentUser?.avatar} size="3xl" />
      <div
        className="absolute right-0 bottom-1 bg-white px-1 border-[1px] rounded-md cursor-pointer select-none"
        onClick={(e) => e.currentTarget.querySelector('input')?.click()}
      >
        Edit
        <input
          type="file"
          accept="image"
          hidden
          onChange={(e) => {
            if (!e.currentTarget.files) return
            handleEditAvatar(e.currentTarget.files[0])
          }}
        />
      </div>
    </div>
  )
}

export default PersonalAvatar
