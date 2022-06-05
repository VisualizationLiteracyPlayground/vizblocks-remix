import * as React from 'react'
import { PictographTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns, GridRowsProp } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'

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

function Pictograph() {
  const { graphData, setSelectedGraph, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const data = graphData.pictograph

  React.useEffect(() => {
    setColumnTemplate(columns)
    setSelectedGraph(GRAPH_TYPES.pictograph)
  }, [setColumnTemplate, setSelectedGraph])

  return (
    <>
      <PictographTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default Pictograph
