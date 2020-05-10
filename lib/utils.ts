// import BLOG from '../blog.config'

// const labels = BLOG.labels || {}
// const layouts = BLOG.layouts || {}

export const Configs = {
  author: 'kentac55',
  summary: 'my blog',
  title: 'sorena',
  description: 'hogehoge',
  domain: 'example.com',

  language: 'ja-jp',
  latestLimit: 5,

  email: 'mailto:dev.kentac55@gmail.com',
  github: 'https://github.com/kentac55',
  twitter: 'https://twitter.com/kentac55',

  googleAnalytics: '',
  enableViews: true,
  // isCN: () => BLOG.language.includes('cn'),

  labels: {
    default: 'posts',
    latest: 'latest',
    list: 'all posts',
  },

  layouts: {
    pageWidth: '750px',
    pageWidthMobile: '88vw',
  },
}
