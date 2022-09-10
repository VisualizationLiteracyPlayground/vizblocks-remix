import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '~/utils/theme'
import { useLoaderData, useParams } from '@remix-run/react'
import EditableTextField from '~/components/EditableTextField'

import { json, LoaderFunction } from '@remix-run/node'
import { supabaseAdmin } from '~/supabase.server'
import { Profile, SavedGraphData } from '~/utils/types'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { styled } from '@mui/material/styles'
import TabPanel from '~/components/TabPanel'
import Button from '@mui/material/Button'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import GraphCard from '~/components/MyGraphs/GraphCard'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { magicLinkStrategy } from '~/utils/auth.server'
import { supabaseClient } from '~/supabase.client'
import toast from 'react-hot-toast'
import MyGraphs from '~/components/MyGraphs'
import { useRootData } from '~/utils/hooks'

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 130,
  },
]

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.MuiButtonBase-root ': {
    color: theme.palette.text.primary,
  },
}))

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  '&.MuiInputLabel-root ': {
    color: theme.palette.text.primary,
  },
}))

type LoaderData = {
  graphsLinkedToClassroom: SavedGraphData[] | null
  members: Profile[] | null
  myGraphs: SavedGraphData[] | null
  classroomMetaData: {
    createdBy?: string
    title: string
    desc: string
    creatorUid?: string
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await magicLinkStrategy.checkSession(request)
  const uid = session?.user?.id ?? ''
  const classroomId = params.classroomId
  const { data: classroomData } = await supabaseAdmin.from('classroom').select().eq('id', classroomId)
  const members: string[] = classroomData?.[0].members
  const graphs: string[] = classroomData?.[0].graphs

  const { data: graphsLinkedToClassroom } = await supabaseAdmin.from('graphs').select().or(`id.in.(${graphs})`)
  const { data: myGraphs } = await supabaseAdmin.from('graphs').select().eq('uid', uid)
  const { data: membersProfile } = await supabaseAdmin.from('profiles').select().or(`id.in.(${members})`)
  const classroomMetaData = {
    createdBy: classroomData?.[0].created_by,
    title: classroomData?.[0].title,
    desc: classroomData?.[0].desc,
    creatorUid: classroomData?.[0].uid,
  }

  return json<LoaderData>({ graphsLinkedToClassroom, members: membersProfile, myGraphs, classroomMetaData })
}

// https://remix.run/docs/en/v1/guides/routing#dynamic-segments
export default function MyClassroom() {
  const { graphsLinkedToClassroom, members, myGraphs, classroomMetaData } = useLoaderData<LoaderData>() ?? []
  const { mode } = useTheme()
  const params = useParams()

  const [tabValue, setTabValue] = React.useState(0)
  const [graphId, setGraphId] = React.useState('')

  const linkedGraphIds = graphsLinkedToClassroom?.map(graph => graph.id) ?? []
  const myUnlinkedGraphs = myGraphs?.filter(graph => !linkedGraphIds.includes(graph.id))

  const { user } = useRootData()
  const editable = user?.id === classroomMetaData?.creatorUid

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleAddGraphToWorks = async () => {
    const { error } = await supabaseClient
      .from('classroom')
      .update({ graphs: [...linkedGraphIds, graphId] })
      .match({ id: params.classroomId })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Successfully added!')
    }
    window.location.reload()
  }

  const handleSaveText = async (type: 'title' | 'desc', value: string) => {
    const { error } = await supabaseClient
      .from('classroom')
      .update({ [type]: value })
      .match({ id: params.classroomId })
    if (error) {
      toast.error(error.message)
    }
  }

  const handleDeleteGraphFromWorks = () => {}

  return (
    <Box
      sx={{
        width: '100%',
        p: 4,
        my: 2,
        bgcolor: mode === 'light' ? 'white' : 'black',
        borderRadius: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        maxWidth: 1200,
        minHeight: '100vh',
      }}
    >
      <EditableTextField value={classroomMetaData.title} editable={editable} onSave={(value: string) => handleSaveText('title', value)} />
      <Typography variant='body1' sx={{ mb: 2 }}>
        By: {classroomMetaData.createdBy}
      </Typography>

      <Box sx={{ display: 'flex' }}>
        <img src='/assets/classroom.jpeg' alt='classroom' width={300} style={{ marginRight: 24 }} />
        <EditableTextField
          value={classroomMetaData.desc}
          fontSize={'1rem'}
          editable={editable}
          onSave={(value: string) => handleSaveText('desc', value)}
        />
      </Box>

      <Typography variant='h6' sx={{ my: 2 }}>
        Add your work
      </Typography>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <FormControl sx={{ width: 600 }}>
          <StyledInputLabel sx={{ color: 'black' }}>Select a saved graph </StyledInputLabel>
          <Select
            value={graphId}
            label='Select a saved graph'
            onChange={e => {
              setGraphId(e.target.value)
            }}
          >
            {myUnlinkedGraphs?.map((graph, index) => {
              return (
                <MenuItem key={index} value={graph.id}>
                  {graph.graph_type} - {graph.graph_data.desc}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <Button size='large' variant='contained' onClick={handleAddGraphToWorks} disabled={myUnlinkedGraphs?.length === 0}>
          Add my work
        </Button>
      </div>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mt: 2 }}>
        <StyledTab label='Works' />
        <StyledTab label='Members' />
        <StyledTab label='VLAT' />
      </Tabs>

      <TabPanel index={0} value={tabValue}>
        <div>
          <MyGraphs graphData={graphsLinkedToClassroom ?? []} />
        </div>
      </TabPanel>

      <TabPanel index={1} value={tabValue}>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid rows={members ?? []} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
        </div>
      </TabPanel>
    </Box>
  )
}

// vlat
// unlocking post-only after taking pre

// add vlat tab in classroom
// add role - students and teachers

// signin by invite only
// focus on the demo
