import React, { FC, useState } from 'react';
import { ConfirmationModal } from 'common/confirmation'

export const ResourceTable: FC = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const cancelDelete = () => {
    alert('cancel')
    setShowDeleteConfirmation(false)
  }

  const confirmDelete = () => {
    alert('confirm')
    setShowDeleteConfirmation(false)
  }

  return <section>
    {!showDeleteConfirmation && <button onClick={() => setShowDeleteConfirmation(true)}>Delete</button>}
    {showDeleteConfirmation && <ConfirmationModal
      title='the title'
      message='content'
      onCancel={cancelDelete}
      onConfirm={confirmDelete}
    />}
  </section>
}
