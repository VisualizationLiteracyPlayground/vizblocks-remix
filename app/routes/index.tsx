import * as React from 'react'
import { Link } from 'remix'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Carousel from '~/components/Carousel'

import heroImage from '../../public/images/hero.png'
import heroDarkImage from '../../public/images/hero-dark.png'
import { useTheme } from '~/utils/theme'
import Container from '@mui/material/Container'

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { mode } = useTheme()

  return (
    <>
      <Box sx={{ backgroundColor: `${mode === 'dark' ? 'white' : 'black'}` }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ padding: '3rem', width: { md: '50%' } }}>
            <Box>
              <Typography variant='h2' fontWeight='900' sx={{ color: `${mode === 'dark' ? 'black' : 'white'}` }}>
                Learn. Create.
              </Typography>
              <Typography variant='h1' fontWeight='900' color='#6cddaa'>
                Visualise.
              </Typography>
            </Box>
            <Typography variant='h5' sx={{ paddingTop: '1rem', paddingBottom: '2rem', color: `${mode === 'dark' ? 'black' : 'white'}` }}>
              VizBlocks is your friendly companion to improve data literacy.
              <br />
              <br />
              What will you create?
            </Typography>

            <Button variant='contained' size='large' component={Link} to='/login' prefetch='intent' color='secondary'>
              <Typography variant='h6' fontWeight='700'>
                Get Started
              </Typography>
            </Button>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              height: '640px',
              width: '50%',
              background: `url(${mode === 'dark' ? heroImage : heroDarkImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </Container>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            height: '640px',
            width: '50%',
            background: `url(${mode === 'light' ? heroImage : heroDarkImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />

        <Box sx={{ padding: '3rem', width: { md: '50%' } }}>
          <Box>
            <Typography variant='h2' fontWeight='900'>
              Learn. Create.
            </Typography>
            <Typography variant='h1' fontWeight='900' color='#6cddaa'>
              Visualise.
            </Typography>
          </Box>
          <Typography variant='h5' sx={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
            VizBlocks is your friendly companion to improve data literacy.
            <br />
            <br />
            What will you create?
          </Typography>
          <Button variant='contained' color='primary' size='large' component={Link} to='/login' prefetch='intent'>
            Get Started
          </Button>
        </Box>
      </Box>

      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box p='3rem' sx={{ width: { md: '50%' } }}>
          <Box>
            <Typography variant='h2' fontWeight='900'>
              Learn. Create.
            </Typography>
            <Typography variant='h1' fontWeight='900' color='#6cddaa'>
              Visualise.
            </Typography>
          </Box>
          <Typography variant='h5' sx={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
            VizBlocks is your friendly companion to improve data literacy.
            <br />
            <br />
            What will you create?
          </Typography>
          <Button variant='contained' color='primary' size='large' component={Link} to='/login' prefetch='intent'>
            Get Started
          </Button>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            height: '640px',
            width: '50%',
            background: `url(${mode === 'light' ? heroImage : heroDarkImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </Box>
    </>
  )
}
