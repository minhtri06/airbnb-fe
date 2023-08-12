import { useEffect } from 'react'

function useOutSideListener(
  event: string,
  refs: { current: any }[],
  action: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (refs.every((r) => !r.current || !r.current.contains(event.target)))
        action()
    }

    document.addEventListener(event, handleClickOutside)
    return () => {
      document.removeEventListener(event, handleClickOutside)
    }
  }, [refs, action, event])
}

export default useOutSideListener
