import * as React from 'react'

import { Link } from 'remix'
import { useTheme } from '~/utils/theme'
import { VizBlocks } from '../svg/VizBlocks'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const settings = [
  { name: 'Profile', to: '/profile' },
  { name: 'Account', to: '/account' },
  { name: 'Logout', to: '/' },
]

export default function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const { mode, toggleColorMode } = useTheme()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <nav style={{ zIndex: 10 }}>
      <AppBar position='static' sx={{ px: '0.25rem' }}>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Button color='inherit' component={Link} to='/' prefetch='intent' sx={{ backgroundColor: 'transparent !important' }}>
              <VizBlocks />
            </Button>

            <Box sx={{ flexGrow: 1 }} />
            <IconButton sx={{ mx: 1 }} onClick={toggleColorMode} color='inherit'>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Box sx={{ flexGrow: 0 }}>
              <Button color='inherit' size='large' sx={{ my: 2 }} component={Link} to='/login' prefetch='intent'>
                <Typography variant='h6' component='div' fontWeight='bold'>
                  Login
                </Typography>
              </Button>

              {/* <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip> */}
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => {
                  const { name, to } = setting
                  return (
                    <MenuItem key={name} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>{name}</Typography>
                    </MenuItem>
                  )
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  )
}
