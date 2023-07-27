'use client'

import useNotificationModal from '@/hooks/contexts/useNotificationModal'
import Modal from './Modal'

const NotificationModal = () => {
  const modal = useNotificationModal()

  const bodyElement =
    typeof modal.body === 'string' ? (
      <div className="text-base text-center">{modal.body}</div>
    ) : (
      modal.body
    )

  return (
    <Modal
      body={bodyElement}
      small
      onClose={() => modal.close()}
      isOpen={modal.isOpen}
      actionLabel="Close"
      action={() => modal.close()}
      title={modal.title}
    />
  )
}

export default NotificationModal
