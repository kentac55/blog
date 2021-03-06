import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Profile from './profile'
import Contacts from './contacts'
import Title from './title'
import { Spacer } from '@zeit-ui/react'
import { blogConfig } from '../config'
import { PageMetadata } from './posts/posts'

type LayoutHeaderProps = {
  meta?: PageMetadata
}

const LayoutHeader: FC<LayoutHeaderProps> = ({ meta }) => (
  <Head>
    {meta && meta.title && (
      <title>
        {meta.title} - {blogConfig.title}
      </title>
    )}
    {meta && meta.description && (
      <meta name="description" content={meta.description} />
    )}
    {meta && meta.description && (
      <meta property="og:description" content={meta.description} />
    )}
    {meta && meta.title && <meta property="og:title" content={meta.title} />}
    {meta && meta.image && <meta property="og:image" content={meta.image} />}
    {meta && meta.image && (
      <meta property="twitter:image" content={meta.image} />
    )}
  </Head>
)

type LayoutProps = {
  children: ReactNode
  meta?: PageMetadata
}

const Layout: FC<LayoutProps> = ({ children, meta }) => {
  const [showAfterRender, setShowAfterRender] = useState(false)
  const inDetailPage = useMemo(() => Boolean(meta && meta.title), [])
  useEffect(() => setShowAfterRender(true), [])

  if (!showAfterRender)
    return (
      <div className="article-content">
        <LayoutHeader meta={meta} />
        {children}
        <style jsx>{`
          .article-content {
            opacity: 0;
            display: none;
          }
        `}</style>
      </div>
    )
  return (
    <section>
      <LayoutHeader meta={meta} />
      <div className="container">
        <Spacer />
        <Profile />
        {inDetailPage && meta && <Title title={meta.title} date={meta.date} />}
        {children}
        <Spacer y={5} />
        <Contacts isDetailPage={inDetailPage} />
      </div>

      <style jsx>{`
        section {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container {
          width: 100%;
          max-width: ${blogConfig.layouts.pageWidth};
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .container :global(h1) {
          font-size: 2rem;
        }

        .container :global(h2) {
          font-size: 1.7rem;
        }

        .container :global(h3) {
          font-size: 1.4rem;
        }

        .container :global(h4) {
          font-size: 1.2rem;
        }

        @media only screen and (max-width: 767px) {
          .container {
            max-width: ${blogConfig.layouts.pageWidthMobile};
            min-height: 100vh;
          }
        }
      `}</style>
    </section>
  )
}

export default Layout
