const fs = require('fs-extra')
const path = require('path')
const extractMetadata = require('extract-mdx-metadata')
const pagePrefix = path.join(__dirname, '../pages')
const docsDir = path.join(__dirname, '../pages')
const targetPath = path.join(__dirname, '../lib/data/metadata.json')

const getMetadata = async (files, parentPath) => {
  return Promise.all(
    files
      .filter(name => name.endsWith('.mdx') || !name.includes('.'))
      .map(async file => {
        const filePath = path.join(parentPath, file)
        const isDirectory = fs.statSync(filePath).isDirectory()
        if (isDirectory) {
          const children = await fs.readdir(filePath)
          const childrenMetadata = await getMetadata(children, filePath)
          return { name: file, children: childrenMetadata }
        }
        const content = await fs.readFile(filePath, 'utf-8')
        const meta = await extractMetadata(content)
        const url = filePath
          .replace(pagePrefix, '')
          .replace('.mdx', '')
        return { name: meta.title || file, url, meta }
      })
  )
}

const sortPosts = (data) => {
  const posts = (data.find(item => item.name === 'posts') || {}).children || []
  const sorted = posts
    .map(post => {
      if (!post.meta) {
        throw new Error(`[missing metadata]: ${post.url}`)
      }
      if (!post.meta.title) {
        throw new Error(`[metadata]: missing key "title" in (${post.name}) ${post.url}`)
      }
      if (!post.meta.date) {
        throw new Error(`[metadata]: missing key "date" in (${post.name}) ${post.url}`)
      }
      if (`${new Date(post.meta.date)}` === 'Invalid Date') {
        throw new Error(`[metadata]: format error "date" in (${post.name}) ${post.url}`)
      }
      return post
    })
    .sort((pre, next) => +new Date(next.meta.date) - new Date(pre.meta.date))

  return data.map(v => {
    if (v.name !== 'posts') return v
    return { ...v, children: sorted }
  })
}

;(async () => {
  try {
    const files = await fs.readdir(docsDir)
    const data = await getMetadata(files, docsDir)
    const sorted = sortPosts(data)
    await fs.ensureFile(targetPath)
    await fs.writeJson(targetPath, sorted)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
