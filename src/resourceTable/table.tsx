import { FC, useCallback, useState } from 'react';
import styled from 'styled-components'

import { ResourceTableRow, ResourceDetails } from 'resourceTable/tableRow'
import { useResourceTableData } from './tableState';
import { deviceSizes } from 'styles/global'

export const ResourceTable: FC = () => {
  const { resources, handleAddRow, handleDeleteRow, setSortOrder } = useResourceTableData()
  const [isAddingRow, setIsAddingRow] = useState(false)

  const handleSortByTitle = useCallback(() => setSortOrder('title'), [setSortOrder])
  const handleShowNewRow = useCallback(() => setIsAddingRow(true), [])
  const handleSaveNewRow = useCallback((resource: ResourceDetails) => {
    setIsAddingRow(false)
    handleAddRow(resource)
  }, [handleAddRow])

  return <section>
    <button onClick={handleShowNewRow}>Add new resource</button>
    <button onClick={handleSortByTitle}>Sort by Title</button>
    <TableDiv>
      {resources.map((r, i) => <ResourceTableRow
        details={r}
        onSaveRow={handleSaveNewRow}
        onDeleteRow={handleDeleteRow}
        key={r.id}
      />)}
      {isAddingRow && <ResourceTableRow onSaveRow={handleSaveNewRow} onDeleteRow={handleDeleteRow} />}
    </TableDiv>
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
