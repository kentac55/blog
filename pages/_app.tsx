import { AppProps } from 'next/app'
import Head from 'next/head'
import { PrismBaseline } from '@zeit-ui/react-prism'
import { ZEITUIProvider, CSSBaseline } from '@zeit-ui/react'
import React, { useCallback, useState, useEffect, useMemo, FC } from 'react'
import useDomClean from '../lib/use-dom-clean'
import { getDNSPrefetchValue } from '../lib/data-transform'
import ThemeConfigProvider from '../lib/components/theme-config-provider'
import { blogConfig } from '../lib/config'

const Application: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [themeType, setThemeType] = useState('light')
  const domain = useMemo(() => getDNSPrefetchValue(blogConfig.domain), [])
  const changeHandle = useCallback((isDark: boolean) => {
    const next = isDark ? 'light' : 'dark'
    setThemeType(next)
  }, [])

  useEffect((): void => {
    if (typeof localStorage !== 'object') return
    const themeType = localStorage.getItem('theme')
    setThemeType(themeType === 'dark' ? 'dark' : 'light')
  }, [])
  useEffect(() => localStorage.setItem('theme', themeType), [themeType])
  useDomClean()

  return (
    <>
      <Head>
        <title>{blogConfig.title}</title>
        {domain && <link rel="dns-prefetch" href={domain} />}
        <meta name="google" content="notranslate" />
        <meta name="referrer" content="strict-origin" />
        <meta name="description" content={blogConfig.description} />
        <meta property="og:site_name" content={blogConfig.title} />
        <meta property="og:description" content={blogConfig.description} />
        <meta property="og:type" content="website" />
        <meta name="generator" content="unix.bio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content={blogConfig.author} />
        <meta name="twitter:creator" content={`@${blogConfig.twitter}`} />
        <meta property="og:title" content={blogConfig.title} />
        <meta property="og:url" content={blogConfig.domain} />
        <meta
          property="og:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          property="twitter:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          itemProp="image"
          property="og:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
      </Head>
      <ZEITUIProvider theme={{ type: themeType }}>
        <CSSBaseline />
        <PrismBaseline />
        <ThemeConfigProvider onChange={changeHandle}>
          <Component {...pageProps} />
        </ThemeConfigProvider>
        <style global jsx>{`
          @media only screen and (max-width: 767px) {
            html {
              font-size: 15px;
            }
          }
        `}</style>
      </ZEITUIProvider>
    </>
  )
}

export default Application
