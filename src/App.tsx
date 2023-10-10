import { FC } from 'react';

import 'App.css';
import { AppContextProviders } from 'common';
import { Page } from 'layout/page'
import { ResourceTable } from 'resourceTable/table'

export const App: FC = () => {
  return <AppContextProviders>
    <Page>
      <ResourceTable />
    </Page>
  </AppContextProviders>;
}
