'use client'

import useNotificationModalStore from '@/hooks/contexts/useNotificationModalStore'
import Modal from './Modal'

const NotificationModal = () => {
  const modal = useNotificationModalStore()

  const bodyElement =
    typeof modal.body === 'string' ? (
      <div className="text-base text-center">{modal.body}</div>
    ) : (
      modal.body
    )

  const handleOnClose = () => {
    modal.callWhenClose()
    modal.close()
  }

  return (
    <Modal
      body={bodyElement}
      small
      onClose={handleOnClose}
      isOpen={modal.isOpen}
      actionLabel="Close"
      action={handleOnClose}
      title={modal.title}
    />
  )
}

export default NotificationModal
