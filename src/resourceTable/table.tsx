import { FC, useCallback, useState } from 'react';

import { ResourceTableRow, ResourceDetails } from 'resourceTable/tableRow'
import { useResourceTableData } from './tableState';

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
    {resources.map((r, i) => <ResourceTableRow
      details={r}
      onSaveRow={handleSaveNewRow}
      onDeleteRow={handleDeleteRow}
      key={r.id}
    />)}
    {isAddingRow && <ResourceTableRow onSaveRow={handleSaveNewRow} onDeleteRow={handleDeleteRow} />}
  </section>
}
