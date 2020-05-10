import React, { FC } from 'react'
import Layout from '../lib/components/layout'
import Posts from '../lib/components/posts/posts'

const Page: FC = () => (
  <Layout>
    <Posts isLatest />
  </Layout>
)

export default Page
