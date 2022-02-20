import * as React from 'react'
import Footer from './Footer'
import Header from './Header'
import { useLocation } from 'remix'

import Box from '@mui/material/Box'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <Box style={{ display: 'flex' }}>
      <Header pathname={pathname} />
      {children}
    </Box>
  )
}
