import React, { FC, useEffect, useState } from 'react';

import { willSucceed } from 'common/mockApiCalls'
import { ResourceDetails } from 'resourceTable/tableRowState'
import { ResourceTableRow } from './tableRow';

export const ResourceTable: FC = () => {
  const [resources, setResources] = useState<ResourceDetails[]>([]);
  useEffect(() => {
    loadData().then((data) => setResources(data))
  }, []);

  return <section>
    {resources.map((r, i) => <ResourceTableRow
      details={r}
      key={i}
    />)}
  </section>
}

const loadData: () => Promise<ResourceDetails[]> = () => {
  console.log("data init, should be called only once")
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
