import ms from 'ms'

export const msToString = (time: number): string => {
  const str = ms(time, { long: true })
  return (
    str
      .replace('days', '日')
      .replace('day', '日')
      .replace('minutes', '分')
      .replace('minute', '分')
      .replace('hours', '時間')
      .replace('hour', '時間')
      .replace('seconds', '秒') + '前'
  )
}

export const getDNSPrefetchValue = (domain: string): string | null => {
  if (!domain) return null
  if (domain.startsWith('http')) return domain.replace(/https?:/, '')
  if (domain.startsWith('//')) return domain
  return `//${domain}`
}
