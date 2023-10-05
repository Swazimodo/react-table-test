import React, { FC } from 'react';
import styled from 'styled-components'

import { ErrorBoundary } from 'layout/errorBoundary'
import { Header } from 'layout/header'
import { Nav } from 'layout/nav'
import { Footer } from 'layout/footer'
import { MediaSizes, getMaxWidthQuery } from 'common/mediaQueries';


interface PageProps {
  children?: React.ReactNode
}

export const Page: FC<PageProps> = (props) => {
  return <PageDiv className='App'>
    <ErrorBoundary>
      <Header />
      <Nav />
      <ContentMain>
        {props.children}
      </ContentMain>
      <Footer />
    </ErrorBoundary>
  </PageDiv>
}

const PageDiv = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    padding: 8px;
  }
`

const ContentMain = styled.main`
  flex-grow: 1;
  max-width: 1200px;
  margin: 16px auto;

  @media ${getMaxWidthQuery(MediaSizes.sm)} {
    width: 100%;
  }
`
