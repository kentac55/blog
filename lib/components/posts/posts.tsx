import Head from 'next/head'
import React, { FC, useMemo } from 'react'
import PostItem from './post-item'
import { useTheme, Link } from '@zeit-ui/react'
import { blogConfig } from '../../config'
import NextLink from 'next/link'
import metadata from '../../data/metadata.json'

export type PageMetadata = {
  title: string
  date: string
  description: string
  image?: string
}

type PageData = {
  name: string
  url: string
  meta: PageMetadata
}

type MetadataNode = {
  name: string
  children: PageData[]
}

const getMoreLink: FC<number> = (len: number) => {
  if (len < blogConfig.latestLimit) return null
  return (
    <NextLink href="/blog" passHref>
      <Link pure title="More">
        ...
      </Link>
    </NextLink>
  )
}

const getLatest = (data: MetadataNode[], isLatest: boolean): PageData[] => {
  const postNode = data.find((item) => item.name === 'posts')
  const posts = (postNode || {}).children || []
  if (!isLatest) return posts
  return posts.slice(0, blogConfig.latestLimit)
}

const getTitle = (isLatest: boolean): string => {
  if (!isLatest) return blogConfig.labels.list
  return blogConfig.labels.latest
}

type PostsProps = { isLatest?: boolean }

const Posts: FC<PostsProps> = ({ isLatest = false }) => {
  const theme = useTheme()
  const posts = useMemo(() => getLatest(metadata, isLatest), [])
  const title = useMemo(() => getTitle(isLatest), [])

  return (
    <section>
      <Head>
        {!isLatest && (
          <title>
            {getTitle(false)} - {blogConfig.title}
          </title>
        )}
      </Head>
      <h2>{title}</h2>
      <div className="content">
        {posts.map((post, index) => (
          <PostItem post={post} key={`${post.url}-${index}`} />
        ))}
        {isLatest && <span className="more">{getMoreLink(posts.length)}</span>}
      </div>
      <style jsx>{`
        section {
          margin-top: calc(${theme.layout.gap} * 2);
        }

        section h2 {
          font-size: 0.8rem;
          color: ${theme.palette.accents_6};
          text-transform: uppercase;
          letter-spacing: 2px;
          border-bottom: 2px solid ${theme.palette.accents_6};
          padding: 2px ${theme.layout.gapQuarter} 0 0;
          display: inline-block;
          margin: 0;
        }

        .content {
          margin: ${theme.layout.gap} 0;
        }

        .more {
          display: block;
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          section {
            margin-top: ${theme.layout.gapQuarter};
          }

          section h2 {
            margin-top: calc(1.5 * ${theme.layout.gap});
          }
        }
      `}</style>
    </section>
  )
}

export default Posts
