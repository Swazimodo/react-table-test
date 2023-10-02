import { useCallback, useMemo, useState } from 'react';

import { willSucceed } from 'common/mockApiCalls'
import { ResourceDetails } from 'resourceTable/tableRow'
import { sortByText, sortByValue } from 'common/sort';

export const useResourceTableData = () => {
  const [resources, setResources] = useState<ResourceDetails[]>([]);
  const [sortOrder, setSortOrder] = useState<SortTypes>('id')
  useMemo(() => loadData().then((data) => setResources(data)), []);
  const sortedResouces = useMemo(() => applySort(resources, sortOrder), [resources, sortOrder]);

  const handleDeleteRow = useCallback((id: string) => {
    setResources(resources.filter((r) => r.id !== id))
  }, [resources])

  const handleAddRow = useCallback((resource: ResourceDetails) => {
    setResources([...resources, resource])
  }, [resources])

  return {
    resources: sortedResouces,
    handleDeleteRow,
    handleAddRow,
    setSortOrder
  }
}

const loadData: () => Promise<ResourceDetails[]> = () => {
  return willSucceed()
    .then(() => [{
      id: "1",
      name: "First item",
      createdOn: new Date('2000-02-01')
    }, {
      id: "2",
      name: "Second item",
      createdOn: new Date('2001-02-02')
    }, {
      id: "3",
      name: "Third item",
      createdOn: new Date('2005-02-03')
    }, {
      id: "4",
      name: "Fourth item",
      createdOn: new Date('2003-02-04')
    }])
}

type SortTypes = 'id' | 'title' | 'date'

const applySort = (resources: ResourceDetails[], sortOrder: SortTypes) => {
  if (sortOrder === 'title') {
    return resources.sort((a, b) => sortByText(a.name, b.name))
  }
  else if (sortOrder === 'date') {
    return resources.sort((a, b) => sortByValue(a.createdOn, b.createdOn))
  }
  else {
    return resources.sort((a, b) => sortByText(a.id, b.id))
  }
}
