'use client'

import { ChangeEvent, ReactElement, useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface InputProps {
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  type?: string
  label?: string
  error?: string
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type,
  label,
  error,
}) => {
  return (
    <div>
      <div
        className={`
          w-full relative border-2 rounded-lg py-2 px-3
          ${error && 'border-rose-600'}`}
      >
        {label && (
          <label
            className={`
            absolute left-2 text-gray-500 transform px-1
            ${
              value !== '' ? 'text-sm -top-[10px] bg-white' : 'bg-transparent'
            }`}
          >
            {label}
          </label>
        )}
        <input
          value={value}
          onChange={onChange}
          type={type}
          className="
        w-full outline-none h-5 
        disabled:opacity-70 disabled:cursor-not-allowed bg-white"
        />
      </div>
      <div className="h-3 text-sm text-rose-600 ">{error}</div>
    </div>
  )
}

export default Input
