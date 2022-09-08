import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '~/utils/theme'
import { useLoaderData, useParams } from '@remix-run/react'
import EditableTextField from '~/components/EditableTextField'

import { json, LoaderFunction } from '@remix-run/node'
import { supabaseAdmin } from '~/supabase.server'
import { SavedGraphData } from '~/utils/types'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { styled } from '@mui/material/styles'
import TabPanel from '~/components/TabPanel'
import Button from '@mui/material/Button'

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.MuiButtonBase-root ': {
    color: theme.palette.text.primary,
  },
}))

type LoaderData = SavedGraphData[] | null

export const loader: LoaderFunction = async ({ request }) => {
  const { data, error } = await supabaseAdmin.from('graphs').select()
  return json<LoaderData>(data)
}

// https://remix.run/docs/en/v1/guides/routing#dynamic-segments
export default function MyClassroom() {
  const data = useLoaderData<LoaderData>() ?? []
  const { mode } = useTheme()
  const params = useParams()
  const id = params.classroomId

  console.log(id)

  const [tabValue, setTabValue] = React.useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <div style={{ padding: 16 }}>
      <Box
        sx={{
          width: '100%',
          p: 4,
          my: 2,
          bgcolor: mode === 'light' ? 'white' : 'black',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <EditableTextField editable />
        <Typography variant='body1' sx={{ mb: 2 }}>
          By: 1234
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <img src='/assets/classroom.jpeg' alt='classroom' width={300} style={{ marginRight: 24 }} />
          <EditableTextField value={'Some description'} fontSize={'1rem'} editable />
        </Box>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mt: 2 }}>
          <StyledTab label='Works' />
          <StyledTab label='Members' />
        </Tabs>

        <TabPanel index={0} value={tabValue}></TabPanel>
      </Box>
    </div>
  )
}
