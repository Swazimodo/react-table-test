import { FC, useCallback, useState } from 'react';
import styled from 'styled-components'

import { ResourceTableRow } from 'resourceTable/tableRow'
import { ResourceDetails } from 'resourceTable/tableRowState'
import { useResourceTableData } from './tableState';
import { deviceSizes } from 'styles/global'
import { TableHeaderRow } from './tableHeader';

export const ResourceTable: FC = () => {
  const { resources, sortColumn, sortDirection, isLoading, handleAddRow, handleDeleteRow, handleSortChange } = useResourceTableData()
  const [isAddingRow, setIsAddingRow] = useState(false)

  const handleShowNewRow = useCallback(() => setIsAddingRow(true), [])
  const handleSaveNewRow = useCallback((resource: ResourceDetails) => {
    setIsAddingRow(false)
    handleAddRow(resource)
  }, [handleAddRow])

  return <section>
    {isLoading && <>loading gif!!</>}
    {!isLoading && <div>
      <button onClick={handleShowNewRow}>Add new resource</button>
      <TableDiv>
        <TableHeaderRow
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
        {resources.map((r, i) => <ResourceTableRow
          details={r}
          onSaveRow={handleSaveNewRow}
          onDeleteRow={handleDeleteRow}
          key={r.id}
        />)}
        {isAddingRow && <ResourceTableRow onSaveRow={handleSaveNewRow} onDeleteRow={handleDeleteRow} />}
      </TableDiv>
    </div>}
  </section>
}

const TableDiv = styled.div`
  background-color: #fbffd8;
  display: flex;
  flex-direction: column;
  margin: 24px;

  @media ${deviceSizes.mobileL} {
    display: table;
    margin: 0 auto;
  }
`
