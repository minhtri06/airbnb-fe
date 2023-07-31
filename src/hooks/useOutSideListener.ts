import { useEffect } from 'react'

function useOutSideListener(
  event: string,
  ref: { current: any },
  action: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      event.bubbles
      if (ref.current && !ref.current.contains(event.target)) {
        action()
      }
    }

    document.addEventListener(event, handleClickOutside)
    return () => {
      document.removeEventListener(event, handleClickOutside)
    }
  }, [ref])
}

export default useOutSideListener
