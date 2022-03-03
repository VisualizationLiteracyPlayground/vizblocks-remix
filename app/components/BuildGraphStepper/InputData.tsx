import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DataGrid, GridCellEditCommitParams, GridColumns, GridRowsProp, GridSelectionModel } from '@mui/x-data-grid'
import { useGraphData } from '~/utils/graphDataContext'

interface InputDataProps {}

// TODO: abstract modal from content, e.g. DataGrid, Form, Save menu
const InputData = ({}: InputDataProps) => {
  // DataGrid
  const { data, setData, columnTemplate } = useGraphData()
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const handleCellEditCommit = React.useCallback((params: GridCellEditCommitParams) => {
    const updatedRow = {
      id: params.id,
      [params.field]: params.value,
    }
    setData(prev => prev.map(row => (row.id === params.id ? { ...row, ...updatedRow } : row)))
  }, [])

  const handleSelectionModel = (ids: GridSelectionModel) => {
    setSelectionModel(ids)
  }

  const handleAddRow = () => {
    const id = data.length + 1
    setData(prevRows => [...prevRows, { id }])
  }

  const handleDeleteRow = () => {
    const selectedIDs = new Set(selectionModel)
    setData(prevRows => prevRows.filter(row => !selectedIDs.has(row.id)))
  }

  return (
    <>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Input data
      </Typography>
      <Button onClick={handleAddRow}>Add</Button>
      <Button onClick={handleDeleteRow}>Delete</Button>
      <Box sx={{ height: 400, width: 1 }}>
        <DataGrid
          rows={data}
          columns={columnTemplate}
          onCellEditCommit={handleCellEditCommit}
          hideFooter
          checkboxSelection
          onSelectionModelChange={handleSelectionModel}
        />
      </Box>
    </>
  )
}

export default InputData
