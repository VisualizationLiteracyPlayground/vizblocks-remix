import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '~/utils/theme'
import Button from '@mui/material/Button'

import ClassList from '~/components/ClassList'
import { useRootData } from '~/utils/hooks'

import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import { supabaseClient } from '~/supabase.client'
import { Classroom } from '~/utils/types'
import { supabaseAdmin } from '~/supabase.server'
import { json, LoaderFunction } from '@remix-run/node'

type LoaderData = Classroom[] | null

export default function Classrooms() {
  const { user, profile } = useRootData()
  const { mode } = useTheme()
  const navigate = useNavigate()
  const classroomData = useLoaderData<LoaderData>() ?? []

  const handleCreateClassroom = async () => {
    const uid = user?.id
    const created_by = `${profile.firstName} ${profile.lastName}`
    const { data, error } = await supabaseClient.from('classroom').insert({ uid, members: [uid], created_by })
    const classroomId = data?.[0].id
    navigate(`${classroomId}`)
  }

  return (
    <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          p: 4,
          my: 2,
          bgcolor: mode === 'light' ? 'white' : 'black',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          maxWidth: 1200,
          maxHeight: '100vh',
        }}
      >
        <Typography variant='h4' sx={{ mb: 4 }}>
          Classroom
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <img src='/assets/classroom.jpeg' alt='classroom' width={300} />
          <Box component={Form} sx={{ mx: 4 }}>
            <Typography sx={{ mb: 4 }}>
              Classroom help educators create a convenient space to interact with students and check their progress on data visualization.
              Get together in a classroom to share your visualizations each other!
            </Typography>

            <Button type='submit' variant='contained' onClick={handleCreateClassroom}>
              Create a classroom
            </Button>
          </Box>
        </Box>

        <Typography variant='h5' sx={{ my: 4 }}>
          Join a Classroom
        </Typography>

        <ClassList data={classroomData} />
      </Box>
    </div>
  )
}
