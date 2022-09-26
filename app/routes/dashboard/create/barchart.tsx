import * as React from 'react'
import { BarChartTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns, GridRowsProp } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'

// define template for column headers
// https://mui.com/components/data-grid/columns/#column-definitions
const columns: GridColumns = [
  { field: 'xval', headerName: 'X Values', width: 180, editable: true },
  { field: 'yval', headerName: 'Y Values', width: 180, type: 'number', editable: true },
]

// initial values for rows based on column template defined in app/utils/graphInitialData.ts

function BarChart() {
  const { graphData, setSelectedGraph, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const data = graphData.barchart

  React.useEffect(() => {
    setSelectedGraph(GRAPH_TYPES.barchart)
    setColumnTemplate(columns)
  }, [setColumnTemplate, setSelectedGraph])

  // const updateSupabaseGraph = async (userId: string) => {
  //   const { data: supaData, error } = await supabaseClient.from('graphs').insert({
  //     userId,
  //     graph_data: {
  //       data,
  //       columnTemplate: columns,
  //       parameters,
  //     },
  //     graph_type: GRAPH_TYPES.barchart,
  //   })

  //   console.log(error, supaData)
  // }

  return (
    <>
      <BarChartTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default BarChart
