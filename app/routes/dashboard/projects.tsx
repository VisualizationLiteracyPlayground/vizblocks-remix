import * as React from 'react'
import MyGraphs from '~/components/MyGraphs'

const mock = new Array(10).fill(0)

export default function Projects() {
  return (
    <div style={{ padding: 16 }}>
      <MyGraphs graphData={mock} />
      <h2>Preview Area</h2>
    </div>
  )
}
