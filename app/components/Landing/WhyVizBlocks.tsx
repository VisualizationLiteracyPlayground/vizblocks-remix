import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import whyVizblocksImage from '~/../../public/images/why-vizblocks.png'

const TEXT = [
  { title: 'Get started in minutes', subtitle: 'No software download required, just create an account and start visualising!' },
  { title: 'Share and learn together', subtitle: 'bla bla bla' },
  { title: 'Simple & intuitive user interface', subtitle: 'bla bla bla' },
  { title: 'A bridge towards professional tools', subtitle: 'bla bla bla' },
]

export default function WhyVizBlocks() {
  return (
    <Box sx={{ boxShadow: '0 10px 14px rgb(0 0 0 / 10%)' }}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ padding: '3rem', width: { md: '50%' } }}>
          <Typography variant='h3' fontWeight='700' sx={{ letterSpacing: '3px', paddingBottom: '3rem' }}>
            Why VizBlocks?
          </Typography>

          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {TEXT.map(({ title, subtitle }) => {
              return (
                <Grid item xs={12} md={6} key={title}>
                  <Typography variant='h5' fontWeight='700'>
                    {title}
                  </Typography>
                  <br />
                  <Typography variant='subtitle1'>{subtitle}</Typography>
                </Grid>
              )
            })}
          </Grid>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            height: '700px',
            width: '40%',
            background: `url(${whyVizblocksImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
      </Container>
    </Box>
  )
}
