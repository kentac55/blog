import React from 'react'
import { ThemeConfigContext } from '../config-context'

type Props = {
  onChange: (isDark: boolean) => void
  children?: React.ReactNode
}

const ThemeConfigProvider: React.FC<Props> = ({
  onChange,
  children,
}: Props) => {
  return (
    <ThemeConfigContext.Provider value={{ onChange }}>
      {children}
    </ThemeConfigContext.Provider>
  )
}

export default React.memo<Props>(ThemeConfigProvider)
