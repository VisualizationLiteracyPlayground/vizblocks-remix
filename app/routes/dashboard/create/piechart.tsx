import * as React from 'react'
import { PieChartTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import { GridColumns, GridRowsProp } from '@mui/x-data-grid'

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
function BarChart() {
  const { data, setData, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters

  React.useEffect(() => {
    setColumnTemplate(columns)
    setData(initialData)
  }, [])

  return (
    <>
      <PieChartTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default BarChart
