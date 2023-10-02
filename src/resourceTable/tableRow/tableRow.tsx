import { FC, useState } from 'react';
import styled from 'styled-components'

import { ConfirmationModal } from 'common/confirmation'
import { useResourceTableRow, ResourceDetails } from 'resourceTable/tableRow/tableRowState'
import { deviceSizes } from 'styles/global'

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
      <TableCellDiv key={1}>{row?.id}</TableCellDiv>,
      <TableCellDiv key={2}>
        <input value={row?.nameField.value ?? ''} onChange={row?.nameField.handleChange} />
      </TableCellDiv>,
      <TableCellDiv key={3}>{row.createdOn?.toDateString()}</TableCellDiv>,
      <TableCellDiv key={4}>
        <button onClick={handleSave}>Save</button>
      </TableCellDiv>
    ]
  }

  const viewRow = () => {
    return [
      <TableCellDiv key={1}>{row?.id}</TableCellDiv>,
      <TableCellDiv key={2}>{row?.nameField.value}</TableCellDiv>,
      <TableCellDiv key={3}>{row.createdOn?.toDateString()}</TableCellDiv>,
      <TableCellDiv key={4}>
        {row.id && <button onClick={handleShowDeleteConfirmation}>Delete</button>}
        {showDelConfirmation && <ConfirmationModal
          onCancel={handleCancelDeleteConfirmation}
          onConfirm={handleDelete}
          message='Do you want to delete?'
        />}
      </TableCellDiv>
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

const RowDiv = styled.div`
  background-color: transparent;

  @media ${deviceSizes.mobileL} {
    display: table-row;
  }
`

const ErrorRowDiv = styled(RowDiv)`
  background-color: #dd0f0f;
`

const NewRowDiv = styled(RowDiv)`
  background-color: #a4b69f;
`

const TableCellDiv = styled.div`
  border: 1px solid #494949;

  @media ${deviceSizes.mobileL} {
    display: table-cell;
  }
`
