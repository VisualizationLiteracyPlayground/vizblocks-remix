import * as React from 'react'
import { PictographTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'

// linked to icons displayed in PicotographTemplate
const SELECT_OPTONS = ['Car', 'Boat', 'Rocket', 'Plane', 'Apple', 'Basketball']

// define template for column headers
// https://mui.com/components/data-grid/columns/#column-definitions
const columns: GridColumns = [
  { field: 'category', headerName: 'Category', width: 180, type: 'singleSelect', valueOptions: [...SELECT_OPTONS], editable: true },
  { field: 'value', headerName: 'Value', width: 180, type: 'number', editable: true },
]

// initial values for rows based on column template defined in app/utils/graphInitialData.ts

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
