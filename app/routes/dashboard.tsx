import * as React from 'react'

import { magicLinkStrategy } from '~/utils/auth.server'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

import CollapsibleMenu from '~/components/CollapsibleMenu'
import type { User } from '@supabase/supabase-js'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

type LoaderData = { user: User | null }

export const loader: LoaderFunction = async ({ request }) => {
  const session = await magicLinkStrategy.checkSession(request, {
    failureRedirect: '/login',
  })

  return json<LoaderData>({ user: session.user })
}

const drawerWidth = 240

export default function Dashboard() {
  const { user } = useLoaderData<LoaderData>()

  return (
    <>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            paddingTop: '1rem',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <CollapsibleMenu />
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'rgba(108, 221, 170, 0.2)', height: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </>
  )
}
