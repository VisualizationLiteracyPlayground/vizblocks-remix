import * as React from 'react'
import { GridRowsProp } from '@mui/x-data-grid'

type GraphContextType = [GridRowsProp, React.Dispatch<React.SetStateAction<GridRowsProp>>]
const GraphDataContext = React.createContext<GraphContextType | undefined>(undefined)

function GraphDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<GridRowsProp>([])

  return <GraphDataContext.Provider value={[data, setData]}>{children}</GraphDataContext.Provider>
}

function useGraphData() {
  const context = React.useContext(GraphDataContext)
  if (context === undefined) {
    throw new Error('useGraphData must be used within a GraphDataProvider')
  }
  return context
}

export { GraphDataProvider, useGraphData }
