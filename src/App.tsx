import { ResourceTable } from 'resourceTable/table'
import { Page } from 'layout/page'
import 'App.css';
import { AppContextProviders } from 'common/AppContextProviders';

function App() {
  return <AppContextProviders>
    <Page>
      <ResourceTable />
    </Page>
  </AppContextProviders>;
}

export default App;
