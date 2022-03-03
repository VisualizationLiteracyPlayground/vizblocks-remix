import * as React from 'react'
import { Outlet } from 'remix'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

import CollapsibleMenu from '~/components/CollapsibleMenu'

import BuildGraphStepper from '~/components/BuildGraphStepper'

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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BuildGraphStepper />
          <Box
            sx={{
              height: '75vh',
              backgroundColor: 'white',
              padding: '48px',
              borderRadius: '10px',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            }}
          >
            <Outlet />
          </Box>
        </div>
      </Box>
    </>
  )
}
