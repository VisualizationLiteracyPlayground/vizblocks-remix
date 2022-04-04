import * as React from 'react'
import Header from './Header'
import Box from '@mui/material/Box'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box style={{ display: 'flex' }}>
      <Header />
      {children}
    </Box>
  )
}
