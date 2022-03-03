import * as React from 'react'
import Box from '@mui/material/Box'
import BuildGraphStepper from '~/components/BuildGraphStepper'
import LineChartTemplate from '~/components/LineChartTemplate'
import { useGraphData } from '~/utils/graphDataContext'

function Create() {
  const [data] = useGraphData()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BuildGraphStepper />
      <Box
        sx={{
          height: '75vh',
          backgroundColor: 'white',
          padding: '48px',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <LineChartTemplate data={data} />
      </Box>
    </div>
  )
}

export default Create
