import metadata from './data/metadata.json'

type PageMetadata = {
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

type DataNode = {
  name: string
  children: Pagedata[]
}

export const fixedPageData = ((node: DataNode[] = metadata): Pagedata[] => {
  const data = node.find((item) => item.name === 'fixed')
  return (data || {}).children || []
})()
