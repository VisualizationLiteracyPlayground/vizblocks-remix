import * as React from 'react'
import { Link } from 'remix'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Footer from '~/components/Layout/Footer'

export default function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box />

      <Typography variant='h4' component='h1' gutterBottom>
        Login page
      </Typography>

      <Footer />
    </Box>
  )
}
