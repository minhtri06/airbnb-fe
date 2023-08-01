import useNewHostingModalStore from '@/hooks/contexts/useNewHostingModalStore'
import Modal from './Modal'

const NewHostingModal = () => {
  const modal = useNewHostingModalStore()

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={() => modal.close()}
      action={() => modal.close()}
      actionLabel="Submit"
      title="Airbnb your home"
    />
  )
}

export default NewHostingModal
