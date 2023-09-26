import React, { FC } from 'react';
import { ErrorBoundary } from 'layout/errorBoundary'
import { Header } from 'layout/header'
import { Nav } from 'layout/nav'
import { Footer } from 'layout/footer'


interface PageProps {
  children?: React.ReactNode
}

export const Page: FC<PageProps> = (props) => {
  return <main>
    <ErrorBoundary>
      <Header />
      <Nav />
      {props.children}
      <Footer />
    </ErrorBoundary>
  </main>
}
