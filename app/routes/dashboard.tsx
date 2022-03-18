import * as React from 'react'
import { Outlet } from 'remix'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

import CollapsibleMenu from '~/components/CollapsibleMenu'

import { GraphDataProvider } from '~/utils/graphDataContext'

const drawerWidth = 240

export default function Dashboard() {
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
