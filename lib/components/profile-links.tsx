import React, { FC, ReactNode, useMemo } from 'react'
import NextLink from 'next/link'
import { useTheme, Link } from '@zeit-ui/react'
import metadata from '../data/metadata.json'
import { blogConfig } from '../config'

export type PageMetadata = {
  title: string
  date: string
  description: string
  image?: string
}

type Pagedata = {
  name: string
  url: string
  meta: PageMetadata
}

type MetadataNode = {
  name: string
  children: Pagedata[]
}

const getFixes = (metas: MetadataNode[]): Pagedata[] => {
  const data = metas.find((item) => item.name === 'fixed')
  return (data || {}).children || []
}

const fillSpace = (name: string): string => {
  return name.replace(/ /g, '_')
}

const makeLink = ({ url, name }: { url: string; name: string }): ReactNode => {
  return (
    <NextLink href={url} key={url} passHref>
      <Link>{fillSpace(name)}</Link>
    </NextLink>
  )
}

const ProfileLinks: FC = () => {
  const theme = useTheme()
  const links = useMemo(() => getFixes(metadata), [])
  return (
    <div className="link">
      {makeLink({ url: '/blog', name: blogConfig.labels.default })}
      {links.map((link) => makeLink(link))}

      <style jsx>{`
        .link :global(a) {
          color: ${theme.palette.accents_6};
          text-transform: uppercase;
          font-size: 0.8rem;
          margin-right: ${theme.layout.gapHalf};
        }

        .link :global(a:hover) {
          color: ${theme.palette.accents_4};
        }

        .link :global(a:last-of-type) {
          margin-right: 0;
        }
      `}</style>
    </div>
  )
}

export default ProfileLinks
