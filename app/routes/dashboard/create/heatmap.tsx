import * as React from 'react'
import { HeatmapTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns, GridRowsProp } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'

// define template for column headers
// https://mui.com/components/data-grid/columns/#column-definitions
const columns: GridColumns = [
  { field: 'xval', headerName: 'X Label', width: 120, editable: true },
  { field: 'yval', headerName: 'Y Label', width: 120, editable: true },
  { field: 'value', headerName: 'Value', width: 120, type: 'number', editable: true },
]

// initial values for rows based on column template defined above
const initialRows: GridRowsProp = generateData()

function generateData(): { id: number; xval: string | number; yval: string | number; value: number }[] {
  const yval = ['A', 'B', 'C', 'D']
  const xval = [0, 1, 2, 3, 4]
  let id = 1
  const array = []

  for (const y of yval) {
    for (const x of xval) {
      array.push({ id, xval: x, yval: y, value: Math.floor(Math.random() * 10) })
      id += 1
    }
  }
  return array
}

function Heatmap() {
  const { graphData, setSelectedGraph, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const data = graphData.heatmap

  React.useEffect(() => {
    setSelectedGraph(GRAPH_TYPES.heatmap)
    setColumnTemplate(columns)
  }, [setColumnTemplate, setSelectedGraph])

  return (
    <>
      <HeatmapTemplate data={data} title={title} />
    </>
  )
}

export default Heatmap
