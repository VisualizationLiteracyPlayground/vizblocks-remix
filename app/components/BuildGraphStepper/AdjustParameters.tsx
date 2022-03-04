import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '~/utils/theme'
import { useGraphData } from '~/utils/graphDataContext'

interface AdjustParametersProps {}

const AdjustParameters = ({}: AdjustParametersProps) => {
  const { mode } = useTheme()
  const { parameters, setParameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParam = {
      [event.target.name]: event.target.value,
    }
    setParameters(prevParams => ({ ...prevParams, ...newParam }))
  }

  console.log(parameters)

  return (
    <>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          [`& .MuiInputLabel-root`]: { color: mode === 'light' ? '#000' : '#fff' },
        }}
        noValidate
        autoComplete='off'
      >
        <Typography variant='h6'>Titles</Typography>
        <TextField
          id='title'
          name='title'
          label='Graph Title'
          variant='standard'
          margin='normal'
          type='text'
          value={title}
          onChange={handleChange}
        />
        <TextField
          id='xlabel'
          name='xlabel'
          label='X-axis Title'
          variant='standard'
          margin='normal'
          type='text'
          value={xlabel}
          onChange={handleChange}
        />
        <TextField
          id='ylabel'
          name='ylabel'
          label='Y-axis Title'
          variant='standard'
          margin='normal'
          type='text'
          value={ylabel}
          onChange={handleChange}
        />
        <TextField
          id='name'
          name='name'
          label='Line Label'
          variant='standard'
          margin='normal'
          type='text'
          value={name}
          onChange={handleChange}
        />
      </Box>
    </>
  )
}

export default AdjustParameters
