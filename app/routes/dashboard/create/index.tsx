import * as React from 'react'
import BuildGraphStepper from '~/components/BuildGraphStepper'
import LineChartTemplate from '~/components/LineChartTemplate'

function Create() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BuildGraphStepper />
      <div
        style={{
          height: '75vh',
          backgroundColor: 'white',
          padding: '48px',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <LineChartTemplate />
      </div>
    </div>
  )
}

export default Create
