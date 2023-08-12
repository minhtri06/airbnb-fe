import { useCallback, useEffect, useState } from 'react'

const useStorage = (key: string, defaultValue: any, storageObject: Storage) => {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue !== null) return JSON.stringify(jsonValue)

    if (typeof defaultValue === 'function') return defaultValue()
    else return defaultValue
  })

  const removeValue = useCallback(() => setValue(undefined), [])

  useEffect(() => {
    if (value === undefined) storageObject.removeItem(key)
    else storageObject.setItem(key, JSON.stringify(value))
  }, [value, storageObject, key])

  return [value, setValue, removeValue]
}

export const useLocalStorage = (key: string, defaultValue: any) =>
  useStorage(key, defaultValue, localStorage)

export const useSessionStorage = (key: string, defaultValue: any) =>
  useStorage(key, defaultValue, sessionStorage)
