import React from 'react'

type Props = {
  onChange: (isDark: boolean) => void
  children?: React.ReactNode
}

export const ThemeConfigContext = React.createContext<Props>({
  onChange: () => {
    throw new Error('not initialized')
  },
})

const useConfigs = (): Props => React.useContext(ThemeConfigContext)

export default useConfigs
