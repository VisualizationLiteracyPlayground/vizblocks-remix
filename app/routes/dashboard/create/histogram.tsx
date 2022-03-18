import * as React from 'react'
import { HistogramTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import { GridColumns, GridRowsProp } from '@mui/x-data-grid'

// define template for column headers
// https://mui.com/components/data-grid/columns/#column-definitions
const columns: GridColumns = [
  { field: 'xval', headerName: 'Bins', width: 180, editable: true },
  { field: 'yval', headerName: 'Y Values', width: 180, type: 'number', editable: true },
]

// initial values for rows based on column template defined above
const initialRows: GridRowsProp = [
  {
    id: 1,
    xval: '18-24',
    yval: 13.38,
  },
  {
    id: 2,
    xval: '25-34',
    yval: 27.65,
  },
  {
    id: 3,
    xval: '35-44',
    yval: 18.45,
  },
  {
    id: 4,
    xval: '45-54',
    yval: 16.62,
  },
  {
    id: 5,
    xval: '55-64',
    yval: 13.42,
  },
  {
    id: 6,
    xval: '65+',
    yval: 10.48,
  },
]

function Histogram() {
  const { data, setData, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters

  React.useEffect(() => {
    setColumnTemplate(columns)
    setData(initialRows)
  }, [])

  return (
    <>
      <HistogramTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default Histogram
