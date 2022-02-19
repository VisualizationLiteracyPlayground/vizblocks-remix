import * as React from 'react'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { Typography } from '@mui/material'

export default function Carousel() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '2rem',
          zIndex: 10,
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Learn, create and vizualise data with Vizblocks. Share with others around the world! Start Creating</Typography>
        </Box>
      </Box>

      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '2rem',
          zIndex: 10,
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}
