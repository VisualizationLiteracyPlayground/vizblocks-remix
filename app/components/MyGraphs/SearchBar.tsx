import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
]

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}))

export default function SearchBar() {
  return (
    <Autocomplete
      freeSolo
      id='free-solo-2-demo'
      disableClearable
      options={top100Films.map(option => option.title)}
      renderInput={params => (
        <StyledTextField
          {...params}
          label='Search here'
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          sx={{ width: 500 }}
        />
      )}
      sx={{ mb: 2 }}
    />
  )
}
