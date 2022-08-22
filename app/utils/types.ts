export enum GRAPH_TYPES {
  linechart = 'linechart',
  barchart = 'barchart',
  piechart = 'piechart',
  scatterplot = 'scatterplot',
  dotplot = 'dotplot',
  pictograph = 'pictograph',
  histogram = 'histogram',
  heatmap = 'heatmap',
}

export interface Profile {
  firstName?: string
  lastName?: string
  email?: string
}

export interface SavedGraphData {
  graph_type: GRAPH_TYPES
  graph_data: {
    data: Record<string, any>
    image: string
    profile: Profile
    desc: string
  }
  uid: string
  id: number
  likes: string[] // stores uid of who liked
}
