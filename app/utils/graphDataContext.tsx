import * as React from 'react'
import { GridColumns, GridRowsProp } from '@mui/x-data-grid'

interface Parameters {
  title?: string
  xlabel?: string
  ylabel?: string
  name?: string
}

const initialParam: Parameters = {
  title: 'Title',
  xlabel: 'X-Axis',
  ylabel: 'Y-Axis',
  name: 'My Line',
}

interface GraphContextType {
  data: GridRowsProp
  setData: React.Dispatch<React.SetStateAction<GridRowsProp>>
  columnTemplate: GridColumns
  setColumnTemplate: React.Dispatch<React.SetStateAction<GridColumns>>
  parameters: Parameters
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>
}
const GraphDataContext = React.createContext<GraphContextType | undefined>(undefined)

function GraphDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<GridRowsProp>([])
  const [columnTemplate, setColumnTemplate] = React.useState<GridColumns>([])
  const [parameters, setParameters] = React.useState<Parameters>(initialParam)

  const value = { data, setData, columnTemplate, setColumnTemplate, parameters, setParameters }

  return <GraphDataContext.Provider value={value}>{children}</GraphDataContext.Provider>
}

function useGraphData() {
  const context = React.useContext(GraphDataContext)
  if (context === undefined) {
    throw new Error('useGraphData must be used within a GraphDataProvider')
  }
  return context
}

export { GraphDataProvider, useGraphData }
