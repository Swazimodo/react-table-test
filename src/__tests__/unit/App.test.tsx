import { render } from '@testing-library/react';

import { App } from 'App';

// prevent the app from loading data after the initial render
// this will allow testing the loading state
jest.mock('common', () => {
  const originalModule = jest.requireActual('common');

  return {
    __esModule: true,
    ...originalModule,
    willSucceed: () => new Promise((resolve, reject) => { })
  };
});

test('renderApp_shouldHaveLayoutElements', async () => {
  const { container, findByRole } = render(<App />);

  const headerElement = await findByRole("banner")
  const navElement = await findByRole("navigation")
  const mainElement = await findByRole("main")
  const footerElement = await findByRole("contentinfo")

  expect(headerElement).toBeInTheDocument();
  expect(navElement).toBeInTheDocument();
  expect(mainElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();
});
