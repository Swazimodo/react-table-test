import { FC, useState } from 'react';
import styled from 'styled-components'

import { ConfirmationModal } from 'common/confirmation'
import { useResourceTableRow, ResourceDetails } from 'resourceTable/tableRowState'
import { MediaSizes, getMaxWidthQuery, getMinWidthQuery } from 'common/mediaQueries';
import { TableCell } from './tableCell';

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
      .then(() => props.onDeleteRow(row.id ?? ''))
      .catch(() => { })
  }

  const editRowView = () => {
    return [
      <TableCell key={1} columnHeaderName='Id'>{row?.id}</TableCell>,
      <TableCell key={2} columnHeaderName='Name'>
        <input autoFocus value={row?.nameField.value ?? ''} onChange={row?.nameField.handleChange} />
      </TableCell>,
      <TableCell key={3} columnHeaderName='Created On'>{row.createdOn?.toDateString()}</TableCell>,
      <TableCell key={4}>
        <button onClick={handleSave}>Save</button>
      </TableCell>
    ]
  }

  const viewRow = () => {
    return [
      <TableCell key={1} columnHeaderName='Id'>{row?.id}</TableCell>,
      <TableCell key={2} columnHeaderName='Name'>{row?.nameField.value}</TableCell>,
      <TableCell key={3} columnHeaderName='Created On'>{row.createdOn?.toDateString()}</TableCell>,
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
  let Wrapper = RowDiv;
  if (props.hasError) {
    Wrapper = ErrorRowDiv;
  } else if (props.isNew) {
    Wrapper = NewRowDiv;
  }
  return <Wrapper>{props.children}</Wrapper>;
}

export const RowDiv = styled.div`
  background-color: #fbffd8;
  @media ${getMinWidthQuery(MediaSizes.sm)} {
    display: table-row;
  }
  @media ${getMaxWidthQuery(MediaSizes.sm)} {
    margin-bottom:8px;
  }
`

const ErrorRowDiv = styled(RowDiv)`
  background-color: #dd0f0f;
`

const NewRowDiv = styled(RowDiv)`
  background-color: #a4b69f;
`
