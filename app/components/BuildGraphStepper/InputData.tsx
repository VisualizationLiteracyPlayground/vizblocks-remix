import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { DataGrid, GridCellEditCommitParams, GridColumns, GridRowsProp, GridSelectionModel } from '@mui/x-data-grid'
import { useGraphData } from '~/utils/graphDataContext'

interface InputDataProps {
  label?: string
  columns: GridColumns
  isActive: boolean
  setActive: () => void
}

const InputData = ({ label = 'Open Modal', columns, isActive, setActive }: InputDataProps) => {
  // Modal
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setActive()
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  // DataGrid
  const { data, setData } = useGraphData()
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
    <div>
      <Button
        onClick={handleOpen}
        disableTouchRipple
        sx={{ color: theme => (isActive ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText), p: 3 }}
      >
        {label}
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Input data
          </Typography>
          <Button onClick={handleAddRow}>Add</Button>
          <Button onClick={handleDeleteRow}>Delete</Button>
          <Box sx={{ height: 400, width: 1 }}>
            <DataGrid
              rows={data}
              columns={columns}
              onCellEditCommit={handleCellEditCommit}
              hideFooter
              checkboxSelection
              onSelectionModelChange={handleSelectionModel}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default InputData
