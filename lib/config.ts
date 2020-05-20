export const blogConfig = {
  author: 'kentac55',
  summary: 'my blog',
  title: 'それな',
  description: '雑記帳',
  domain: 'blog.kc5m.com',

  language: 'ja-jp',
  latestLimit: 5,

  email: 'mailto:dev.kentac55@gmail.com',
  github: 'https://github.com/kentac55',
  twitter: 'https://twitter.com/kentac55',

  googleAnalytics: 'UA-167234326-1',
  enableViews: true,

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

export type Config = typeof blogConfig
