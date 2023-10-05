import { FC } from 'react';
import styled from 'styled-components'

import { MediaSizes, getMaxWidthQuery } from 'common/mediaQueries';

interface TableCellProps {
  columnHeaderName?: string
  children?: React.ReactNode
}

export const TableCell: FC<TableCellProps> = (props) => {
  const { columnHeaderName, children } = props
  return <TableCellDiv className={columnHeaderName ? undefined : 'noHeader'}>
    {columnHeaderName && <TableCellHeaderDiv>{columnHeaderName}: </TableCellHeaderDiv>}
    {children}
  </TableCellDiv>
}

export const TableCellDiv = styled.div`
  border: 1px solid #494949;
  padding: 4px;

  @media (min-width: ${MediaSizes.sm}px) {
    display: table-cell;
  }

  &.noHeader {
    text-align: right;
  }
`

const TableCellHeaderDiv = styled.div`
  display: none;

  @media ${getMaxWidthQuery(MediaSizes.sm)} {
    display: inline-block;
    width: 96px;
    font-weight: bold;
  }
`
