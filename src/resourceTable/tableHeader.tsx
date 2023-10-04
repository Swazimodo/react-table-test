import { FC, useCallback } from "react"
import styled from 'styled-components'

import { useMediaQuery, MediaSizes } from "common/mediaHooks"
import { RowDiv, TableCellDiv } from 'resourceTable/tableRow'
import { SortColumn, SortDirection } from 'resourceTable/tableState'

interface TableHeaderProps {
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSortChange: (sortColumn: SortColumn, sortDirection: SortDirection) => void
}

export const TableHeaderRow: FC<TableHeaderProps> = (props) => {
  const query = useMediaQuery(MediaSizes.sm);

  // hide the header on mobile
  if (!query) {
    return null;
  }

  return <RowDiv>
    <TableHeaderCell
      selectedSortColumn={props.sortColumn}
      sortColumn={'id'}
      sortDirection={props.sortDirection}
      onHeaderCellClick={props.onSortChange}
    >Id</TableHeaderCell>
    <TableHeaderCell
      selectedSortColumn={props.sortColumn}
      sortColumn={'title'}
      sortDirection={props.sortDirection}
      onHeaderCellClick={props.onSortChange}
    >Name</TableHeaderCell>
    <TableHeaderCell
      selectedSortColumn={props.sortColumn}
      sortColumn={'createdOn'}
      sortDirection={props.sortDirection}
      onHeaderCellClick={props.onSortChange}
    >Created On</TableHeaderCell>
    <TableCellDiv />
  </RowDiv>
}

interface TableHeaderCellProps {
  selectedSortColumn: SortColumn
  sortColumn: SortColumn
  sortDirection: SortDirection
  onHeaderCellClick: (sortColumn: SortColumn, sortDirection: SortDirection) => void
  children?: React.ReactNode
}

const TableHeaderCell: FC<TableHeaderCellProps> = (props) => {
  const {
    selectedSortColumn,
    sortColumn,
    sortDirection,
    onHeaderCellClick,
    children
  } = props

  const isSelectedSort = selectedSortColumn === sortColumn
  const handleClick = useCallback(() => {
    if (!isSelectedSort || (sortDirection === 'desc')) {
      onHeaderCellClick(sortColumn, 'asc')
    } else {
      onHeaderCellClick(sortColumn, 'desc')
    }
  }, [onHeaderCellClick, sortColumn, sortDirection, isSelectedSort])

  return <TableHeaderCellDiv onClick={handleClick}>
    {children}
    {(isSelectedSort && sortDirection === 'asc') && " ^"}
    {(isSelectedSort && sortDirection === 'desc') && " v"}
  </TableHeaderCellDiv>
}

const TableHeaderCellDiv = styled(TableCellDiv)`
  cursor: pointer;
  font-weight: bold;
`
