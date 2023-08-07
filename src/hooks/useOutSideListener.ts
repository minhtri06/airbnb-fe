import { useEffect } from 'react'

function useOutSideListener(
  event: string,
  ref: { current: any },
  action: () => void,
  dependencies: any[] = [],
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
  }, [ref, ...dependencies])
}

export default useOutSideListener
