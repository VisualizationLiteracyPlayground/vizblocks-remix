import * as React from 'react'
import { ScatterPlotTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import { GridColumns, GridRowsProp } from '@mui/x-data-grid'

// define template for column headers
// https://mui.com/components/data-grid/columns/#column-definitions
const columns: GridColumns = [
  { field: 'xval', headerName: 'X Value', width: 180, type: 'number', editable: true },
  { field: 'yval', headerName: 'Y Value', width: 180, type: 'number', editable: true },
]

// initial values for rows based on column template defined above
// TODO: add z-axis to template
const initialData: GridRowsProp = [
  { id: 1, xval: 100, yval: 200, zval: 200 },
  { id: 2, xval: 120, yval: 100, zval: 260 },
  { id: 3, xval: 170, yval: 300, zval: 400 },
  { id: 4, xval: 140, yval: 250, zval: 280 },
  { id: 5, xval: 150, yval: 400, zval: 500 },
  { id: 6, xval: 110, yval: 280, zval: 200 },
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
      <ScatterPlotTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default BarChart
