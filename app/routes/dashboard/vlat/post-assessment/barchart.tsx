import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useTheme } from '~/utils/theme'
import { IconButton } from '@mui/material'
import { Link } from '@remix-run/react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import VlatQuiz from '~/components/VlatQuiz'
import { barChartPostQuestion1, barChartPostQuestion2 } from '~/constants'

export default function BarChart() {
  const { mode } = useTheme()

  const handleUpdate = (points: number) => {
    console.log(points)
  }

  return (
    <div style={{ padding: 16 }}>
      <Box
        sx={{
          width: '100%',
          p: 4,
          my: 2,
          bgcolor: mode === 'light' ? 'white' : 'black',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          height: '87vh',
          overflowY: 'scroll',
        }}
      >
        <Box sx={{ position: 'sticky', top: 0 }}>
          <IconButton component={Link} to='/dashboard/vlat/pre-assessment'>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography variant='h4' sx={{ mb: 4 }} textAlign='center'>
          VLAT Pre-Assessment: Bar Chart
        </Typography>

        <Box sx={{ pl: 8 }}>
          <VlatQuiz questionNum={1} question={barChartPostQuestion1} onUpdate={handleUpdate} />
          <VlatQuiz questionNum={2} question={barChartPostQuestion2} onUpdate={handleUpdate} />
        </Box>

        <Box sx={{ pl: 8, mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' size='large' sx={{ width: 200 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  )
}
