import react, { FC, useState } from 'react';
import styled from 'styled-components'

import { ConfirmationModal } from 'common/confirmation'
import { useResourceTableRow, ResourceDetails } from 'resourceTable/tableRow/tableRowState'

interface ResourceTableRowProps {
  details?: ResourceDetails
  onSaveRow: (resource: ResourceDetails) => void
  onDeleteRow: (id: string) => void
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

  const handleSave = () => {
    row.handleSave()
      .then((resource) => props.onSaveRow(resource))
      .catch(() => { })
  }

  const handleDelete = () => {
    setShowDelConfirmation(false)
    row.handleDelete()
    props.onDeleteRow(row.id ?? '')
  }

  const editRowView = () => {
    return [
      <TableCell key={1}>{row?.id}</TableCell>,
      <TableCell key={2}>
        <input value={row?.nameField.value ?? ''} onChange={row?.nameField.handleChange} />
      </TableCell>,
      <TableCell key={3}>{row.createdOn?.toDateString()}</TableCell>,
      <TableCell key={4}>
        <button onClick={handleSave}>Save</button>
      </TableCell>
    ]
  }

  const viewRow = () => {
    return [
      <TableCell key={1}>{row?.id}</TableCell>,
      <TableCell key={2}>{row?.nameField.value}</TableCell>,
      <TableCell key={3}>{row.createdOn?.toDateString()}</TableCell>,
      <TableCell key={4}>
        {row.id && <button onClick={handleShowDeleteConfirmation}>Delete</button>}
        {showDelConfirmation && <ConfirmationModal
          onCancel={handleCancelDeleteConfirmation}
          onConfirm={handleDelete}
          message='Do you want to delete?'
        />}
      </TableCell>
    ]
  }

  return <RowWrapper
    hasError={row.hasError}
    isNew={row.isNew}
  >
    {row.isNew ? editRowView() : viewRow()}
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

const TableCell = styled.div`
  border: 1px solid #494949;
`
