import React, { FC, useState } from 'react';
import styled from 'styled-components'

import { ConfirmationModal } from 'common/confirmation'
import { useResourceTableRow, ResourceDetails } from 'resourceTable/tableRowState'

interface ResourceTableRowProps {
  details?: ResourceDetails
}

export const ResourceTableRow: FC<ResourceTableRowProps> = (props) => {
  const row = useResourceTableRow(props.details)
  const [showDelConfirmation, setShowDelConfirmation] = useState(false)

  const handleShowDeleteConfirmation = () => {
    setShowDelConfirmation(true)
  }

  const handleCancelDeleteConfirmation = () => {
    setShowDelConfirmation(false)
  }

  const handleDelete = () => {
    setShowDelConfirmation(false)
    row.handleDelete()
  }


  return <RowWrapper
    hasError={row.hasError}
    isNew={row.isNew}
  >
    row
    <button onClick={handleShowDeleteConfirmation}>Delete</button>
    <ConfirmationModal
      onCancel={handleCancelDeleteConfirmation}
      onConfirm={handleDelete}
      message='Do you want to delete?'
    />
  </RowWrapper>
}

interface RowWrapperProps {
  children?: React.ReactNode
  isNew: boolean
  hasError: boolean
}

const RowWrapper: FC<RowWrapperProps> = (props) => {
  let Wrapper = Row;
  if (props.hasError) {
    Wrapper = ErrorRow;
  } else if (props.isNew) {
    Wrapper = NewRow;
  }
  return <Wrapper>{props.children}</Wrapper>;
}

const Row = styled.div`
  background-color: transparent;
`

const ErrorRow = styled(Row)`
  background-color: #dd0f0f;
`

const NewRow = styled(Row)`
  background-color: #a4b69f;
`
