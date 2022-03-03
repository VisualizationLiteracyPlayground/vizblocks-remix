import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

interface InputModalProps {
  label?: string
  setActive: () => void
  children?: React.ReactNode
}

// TODO: abstract modal from content, e.g. DataGrid, Form, Save menu
const InputModal = ({ label = 'Open Modal', setActive, children }: InputModalProps) => {
  // Modal
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setActive()
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} disableTouchRipple sx={{ p: 3 }}>
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
          {children}
        </Box>
      </Modal>
    </div>
  )
}

export default InputModal
