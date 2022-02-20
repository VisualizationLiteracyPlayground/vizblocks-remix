import { Box } from '@mui/material'
import * as React from 'react'
import Hero from './Hero'
import Footer from '../Layout/Footer'

export default function Landing() {
  return (
    <Box px={{ display: 'flex', flexDirection: 'column', height: '100vh', flexGrow: 1, paddingTop: '75px' }}>
      <Hero />
      <Hero />
      <Hero />
      <Footer />
    </Box>
  )
}
