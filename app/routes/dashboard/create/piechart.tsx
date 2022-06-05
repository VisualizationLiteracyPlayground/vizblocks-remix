import * as React from 'react'
import { PieChartTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns, GridRowsProp } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'

// define template for column headers
// https://mui.com/components/data-grid/columns/#column-definitions
const columns: GridColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'value', headerName: 'Value', width: 180, type: 'number', editable: true },
]

// initial values for rows based on column template defined above
const initialData: GridRowsProp = [
  { id: 1, name: 'Group A', value: 400 },
  { id: 2, name: 'Group B', value: 300 },
  { id: 3, name: 'Group C', value: 300 },
  { id: 4, name: 'Group D', value: 200 },
]
function PieChart() {
  const { graphData, setSelectedGraph, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const data = graphData.piechart

  React.useEffect(() => {
    setColumnTemplate(columns)
    setSelectedGraph(GRAPH_TYPES.piechart)
  }, [setColumnTemplate, setSelectedGraph])

  return (
    <>
      <PieChartTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default PieChart
