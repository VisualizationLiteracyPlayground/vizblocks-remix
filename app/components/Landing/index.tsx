import * as React from 'react'
import Box from '@mui/material/Box'

import Hero from './Hero'
import WhyVizBlocks from './WhyVizBlocks'
import Features from './Features'
import Banner from './Banner'
import Credits from './Credits'
import Footer from '../Layout/Footer'

export default function Landing() {
  return (
    <Box
      px={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        flexGrow: 1,
        paddingTop: '75px',
      }}
    >
      <Hero />
      <WhyVizBlocks />
      <Features />
      <Banner />
      <Credits />
      <Footer />
    </Box>
  )
}
