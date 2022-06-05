import * as React from 'react'
import type { GridColumns, GridRowsProp } from '@mui/x-data-grid'
import { GRAPH_TYPES } from './types'
import { graphInitialData } from './graphInitialData'

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

type Action = { type: GRAPH_TYPES; data: GridRowsProp }
type Dispatch = (action: Action) => void
// type State = { [key in GRAPH_TYPES]: GridRowsProp } | {}
type State = typeof graphInitialData

interface GraphContextType {
  graphData: State
  graphDispatch: Dispatch
  // setData: React.Dispatch<React.SetStateAction<GridRowsProp>>
  selectedGraph: GRAPH_TYPES
  setSelectedGraph: React.Dispatch<React.SetStateAction<GRAPH_TYPES>>
  columnTemplate: GridColumns
  setColumnTemplate: React.Dispatch<React.SetStateAction<GridColumns>>
  parameters: Parameters
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>
}
const GraphDataContext = React.createContext<GraphContextType | undefined>(undefined)

function dataReducer(state: State, action: Action) {
  switch (action.type) {
    case GRAPH_TYPES.barchart: {
      return { ...state, barchart: action.data }
    }
    default: {
      throw new Error(`Unhandled action types: ${action.type}`)
    }
  }
}

const initialState = graphInitialData

function GraphDataProvider({ children }: { children: React.ReactNode }) {
  const [graphData, graphDispatch] = React.useReducer(dataReducer, initialState)
  const [selectedGraph, setSelectedGraph] = React.useState<GRAPH_TYPES>(GRAPH_TYPES.barchart)
  const [columnTemplate, setColumnTemplate] = React.useState<GridColumns>([])
  const [parameters, setParameters] = React.useState<Parameters>(initialParam)

  const value = { graphData, graphDispatch, selectedGraph, setSelectedGraph, columnTemplate, setColumnTemplate, parameters, setParameters }

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
