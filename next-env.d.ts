/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '@zeit-ui/react-prism' {
  import { ReactComponent } from 'react'
  export const PrismBaseline: ReactComponent
}

declare module 'styled-jsx/server' {
  const flush: () => void
  export default flush
}
