import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { SavedGraphData } from '~/utils/types'

import { useLoaderData } from '@remix-run/react'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}))

interface Props {
  value?: string
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>
  data: SavedGraphData[]
}

export default function SearchBar({ value, setValue, data }: Props) {
  return (
    <Autocomplete
      freeSolo
      id='free-solo-2-demo'
      value={value}
      onChange={(event: any, newValue: string | undefined) => {
        setValue(newValue)
      }}
      disableClearable
      options={data.map(option => option.graph_type)}
      renderInput={params => (
        <StyledTextField
          {...params}
          label='Search by graph types here'
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          sx={{ width: 500 }}
        />
      )}
      sx={{ mb: 4 }}
    />
  )
}
