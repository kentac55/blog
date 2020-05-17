import { useEffect, useState } from 'react'
import { blogConfig } from './config'

const host = 'https://views.show/json'
type ViewsShowType = {
  count: number
}
const getViews = async (
  key: string,
  readOnly: boolean
): Promise<ViewsShowType> => {
  let url = `${host}?key=${key}`
  if (readOnly) {
    url += '&readonly=1'
  }
  try {
    const response = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok) return { count: 0 }
    return response.json()
  } catch (e) {
    return { count: 0 }
  }
}

const useViewsShow = (
  key: string,
  { readOnly = false, enableViews = blogConfig.enableViews } = {}
): [number, boolean] => {
  const [count, setCount] = useState(0)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    let unmount = false
    if (!enableViews) return
    ;(async (): Promise<void> => {
      const res = await getViews(key, readOnly)
      if (unmount) return
      setCount(res.count)
      setUpdated(true)
    })()
    return (): void => {
      unmount = true
    }
  }, [])

  return [count, updated]
}

export default useViewsShow
