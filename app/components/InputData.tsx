import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { DataGrid, GridCellEditCommitParams, GridColumns, GridRowsProp, GridSelectionModel } from '@mui/x-data-grid'
import { useGraphData } from '~/utils/graphDataContext'

interface InputDataProps {
  label?: string
}

const columns: GridColumns = [
  // { field: 'id', headerName: '#', editable: false },
  { field: 'xval', headerName: 'X Values', width: 180, editable: true },
  { field: 'yval', headerName: 'Y Values', width: 180, type: 'number', editable: true },
]

const INITIAL_ROWS: GridRowsProp = [
  {
    id: 1,
    xval: 'Page A',
    yval: 4000,
  },
  {
    id: 2,
    xval: 'Page B',
    yval: 3000,
  },
  {
    id: 3,
    xval: 'Page C',
    yval: 2000,
  },
  {
    id: 4,
    xval: 'Page D',
    yval: 2780,
  },
  {
    id: 5,
    xval: 'Page E',
    yval: 1890,
  },
  {
    id: 6,
    xval: 'Page F',
    yval: 2390,
  },
  {
    id: 7,
    xval: 'Page G',
    yval: 3490,
  },
]

const InputData = ({ label = 'Open Modal' }: InputDataProps) => {
  // Modal
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // DataGrid
  const [data, setData] = useGraphData()
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  React.useEffect(() => {
    setData(INITIAL_ROWS)
  }, [])

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
      <Button onClick={handleOpen} disableTouchRipple sx={{ color: theme => theme.palette.text.primary, p: 3 }}>
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
          <Box
            sx={{
              height: 400,
              width: 1,
              '& .Mui-error': {
                bgcolor: theme => `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
                color: theme => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
              },
            }}
          >
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
