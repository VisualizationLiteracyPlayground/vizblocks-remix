import * as React from 'react'
import BuildGraphStepper from '~/components/BuildGraphStepper'
import LineChartTemplate from '~/components/LineChartTemplate'

function Create() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BuildGraphStepper />
      <div style={{ height: '70vh' }}>
        <LineChartTemplate />
      </div>
    </div>
  )
}

export default Create
