import React from 'react';
import { render } from '@testing-library/react';

import { App } from 'App';

test('renderApp_shouldHaveLayoutElements', () => {
  const { container } = render(<App />);

  const headerElement = container.querySelector('header');
  const navElement = container.querySelector('nav');
  const mainElement = container.querySelector('main');
  const footerElement = container.querySelector('footer');
  expect(headerElement).toBeInTheDocument();
  expect(navElement).toBeInTheDocument();
  expect(mainElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();
});
