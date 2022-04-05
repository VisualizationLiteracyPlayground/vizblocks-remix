import * as React from 'react'
import { Form } from 'remix'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { StyledTextField } from '~/components/StyledTextField'
import { useTheme } from '~/utils/theme'

export default function Profile() {
  const { theme } = useTheme()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Form
        style={{
          background: theme.palette.text.secondary,
          padding: 32,
          borderRadius: 8,
          margin: '16px 0',
        }}
      >
        <Typography textAlign={'center'} variant='h5' marginBottom={4} fontWeight={'bold'}>
          Edit Profile
        </Typography>
        <StyledTextField id='firstName' label='First name' type='text' name='firstName' fullWidth margin='normal' />
        <StyledTextField id='lastName' label='Last name' type='text' name='lastName' fullWidth margin='normal' />
        <StyledTextField id='email' label='Email' type='email' name='email' value='123$gmail.com' fullWidth margin='normal' disabled />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button size='large'>Update</Button>
        </div>
      </Form>
    </Box>
  )
}
