import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}))
