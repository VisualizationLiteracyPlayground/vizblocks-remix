import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
}

interface Props {
  visible: boolean
  graphDesc?: string
  handleClose: () => void
  handleConfirm: () => void
}

export default function DeleteModal({ visible, handleClose, graphDesc, handleConfirm }: Props) {
  return (
    <>
      <Modal open={visible} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography variant='h6' textAlign='center'>
            Are you sure you want to delete this saved graph?
          </Typography>
          <Typography textAlign='center'>{graphDesc}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
            <Button sx={{ width: 130 }} variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ width: 130 }} variant='contained' onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
