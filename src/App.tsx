import { FC } from 'react';

import 'App.css';
import { AppContextProviders } from 'common';
import { ErrorBoundary } from 'layout/errorBoundary'
import { Page } from 'layout/page'
import { ResourceTable } from 'pages/resourceTable/table'

export const App: FC = () => {
  return <ErrorBoundary>
    <AppContextProviders>
      <Page>
        <ResourceTable />
      </Page>
    </AppContextProviders>
  </ErrorBoundary>;
}
