import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import { useTheme } from '~/utils/theme'
import { IconButton } from '@mui/material'

import { Link } from '@remix-run/react'

import Tooltip from '@mui/material/Tooltip'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import PieChartIcon from '@mui/icons-material/PieChart'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot'
import BlurLinearIcon from '@mui/icons-material/BlurLinear'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart'
import GradientIcon from '@mui/icons-material/Gradient'

const data = [
  { icon: <ShowChartIcon />, label: 'Line Chart', to: '/dashboard/vlat/pre-assessment/linechart', disabled: true },
  { icon: <BarChartIcon />, label: 'Bar Chart', to: '/dashboard/vlat/pre-assessment/barchart', disabled: false },
  { icon: <PieChartIcon />, label: 'Pie Chart', to: '/dashboard/vlat/pre-assessment/piechart', disabled: false },
  { icon: <ScatterPlotIcon />, label: 'Scatter Plot', to: '/dashboard/vlat/pre-assessment/scatterplot', disabled: true },
  { icon: <BlurLinearIcon />, label: 'Dot Plot', to: '/dashboard/vlat/pre-assessment/dotplot', disabled: true },
  { icon: <InsertPhotoIcon />, label: 'Pictograph', to: '/dashboard/vlat/pre-assessment/pictograph', disabled: true },
  { icon: <StackedBarChartIcon />, label: 'Histogram', to: '/dashboard/vlat/pre-assessment/histogram', disabled: true },
  { icon: <GradientIcon />, label: 'Heat Map', to: '/dashboard/vlat/pre-assessment/heatmap', disabled: true },
]

export default function PreAssessment() {
  const { mode } = useTheme()

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
        }}
      >
        <IconButton component={Link} to='/dashboard/vlat'>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ mb: 4 }} textAlign='center'>
            Pre-Assessment
          </Typography>
          <img src='/assets/vlat-3.png' alt='study' height={200} />
        </Box>
        <Grid container sx={{ my: 2 }} rowSpacing={4} columnSpacing={2}>
          {data.map((chart, index) => {
            const { label, icon, to, disabled } = chart
            return (
              <Grid item xs={4} key={index}>
                <Tooltip title={disabled ? 'Coming Soon' : ''} arrow placement='top'>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                      sx={{ width: 200 }}
                      variant='outlined'
                      color='secondary'
                      size='large'
                      startIcon={icon}
                      component={Link}
                      to={to}
                      disabled={disabled}
                    >
                      {label}
                    </Button>
                    <Typography variant='subtitle1' sx={{ mt: 2 }}>
                      Top Score: 0
                    </Typography>
                  </Box>
                </Tooltip>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  )
}
