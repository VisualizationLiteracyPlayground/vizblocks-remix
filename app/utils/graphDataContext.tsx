import * as React from 'react'
import { GridColumns, GridRowsProp } from '@mui/x-data-grid'

interface GraphContextType {
  data: GridRowsProp
  setData: React.Dispatch<React.SetStateAction<GridRowsProp>>
  columnTemplate: GridColumns
  setColumnTemplate: React.Dispatch<React.SetStateAction<GridColumns>>
}
const GraphDataContext = React.createContext<GraphContextType | undefined>(undefined)

function GraphDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<GridRowsProp>([])
  const [columnTemplate, setColumnTemplate] = React.useState<GridColumns>([])

  return <GraphDataContext.Provider value={{ data, setData, columnTemplate, setColumnTemplate }}>{children}</GraphDataContext.Provider>
}

function useGraphData() {
  const context = React.useContext(GraphDataContext)
  if (context === undefined) {
    throw new Error('useGraphData must be used within a GraphDataProvider')
  }
  return context
}

export { GraphDataProvider, useGraphData }
