import * as React from 'react'
import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MyGraphs from '~/components/MyGraphs'
import { supabaseAdmin } from '~/supabase.server'
import { SavedGraphData } from '~/utils/types'
import Box from '@mui/material/Box'
import { useTheme } from '~/utils/theme'
import Typography from '@mui/material/Typography'

type LoaderData = SavedGraphData[] | null

export const loader: LoaderFunction = async ({ request }) => {
  const { data, error } = await supabaseAdmin.from('graphs').select()
  return json<LoaderData>(data)
}

export default function Projects() {
  const { mode } = useTheme()
  const data = useLoaderData<LoaderData>() ?? []

  return (
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
      <Typography variant='h4' sx={{ mb: 4 }}>
        Projects
      </Typography>
      <MyGraphs graphData={data} />
    </Box>
  )
}

// project gallery, differentiate between mine and others
