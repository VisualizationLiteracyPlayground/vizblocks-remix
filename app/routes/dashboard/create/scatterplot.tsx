import * as React from 'react'
import { ScatterPlotTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns, GridRowsProp } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'

// define template for column headers
// https://mui.com/components/data-grid/columns/#column-definitions
const columns: GridColumns = [
  { field: 'xval', headerName: 'X Value', width: 180, type: 'number', editable: true },
  { field: 'yval', headerName: 'Y Value', width: 180, type: 'number', editable: true },
]

// initial values for rows based on column template defined above
const initialData: GridRowsProp = [
  { id: 1, xval: 100, yval: 200 },
  { id: 2, xval: 120, yval: 100 },
  { id: 3, xval: 170, yval: 300 },
  { id: 4, xval: 140, yval: 250 },
  { id: 5, xval: 150, yval: 400 },
  { id: 6, xval: 110, yval: 280 },
]
function ScatterPlot() {
  const { graphData, setSelectedGraph, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const data = graphData.scatterplot

  React.useEffect(() => {
    setColumnTemplate(columns)
    setSelectedGraph(GRAPH_TYPES.scatterplot)
  }, [setColumnTemplate, setSelectedGraph])

  return (
    <>
      <ScatterPlotTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default ScatterPlot
