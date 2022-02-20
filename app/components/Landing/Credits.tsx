import * as React from 'react'
import { Link } from 'remix'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { VizBlocks } from '../svg/VizBlocks'
import { useTheme } from '~/utils/theme'

export default function Credits() {
  const { mode } = useTheme()

  return (
    <Box>
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <Typography variant='h6' fontWeight='700' sx={{ letterSpacing: '3px' }}>
          Credits
        </Typography>
      </Container>
    </Box>
  )
}
