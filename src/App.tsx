import React from 'react';
import { ResourceTable } from 'resourceTable/table'
import { Page } from 'layout/page'
import 'App.css';

function App() {
  return (
    <div className="App">
      <Page>
        <ResourceTable />
      </Page>
    </div>
  );
}

export default App;
