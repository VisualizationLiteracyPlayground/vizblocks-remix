import * as React from 'react'
import { PictographTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import { GridColumns, GridRowsProp } from '@mui/x-data-grid'

// linked to icons displayed in PicotographTemplate
const SELECT_OPTONS = ['Car', 'Boat', 'Rocket', 'Plane']

// define template for column headers
// https://mui.com/components/data-grid/columns/#column-definitions
const columns: GridColumns = [
  { field: 'category', headerName: 'Category', width: 180, type: 'singleSelect', valueOptions: [...SELECT_OPTONS], editable: true },
  { field: 'value', headerName: 'Value', width: 180, type: 'number', editable: true },
]

// initial values for rows based on column template defined above
const initialRows: GridRowsProp = [
  { id: 1, category: 'Car', value: 2 },
  { id: 2, category: 'Boat', value: 5 },
  { id: 3, category: 'Rocket', value: 3 },
  { id: 4, category: 'Plane', value: 8 },
]

function Picograph() {
  const { data, setData, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters

  React.useEffect(() => {
    setColumnTemplate(columns)
    setData(initialRows)
  }, [])

  return (
    <>
      <PictographTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default Picograph
