import * as React from 'react'

import { authenticator, magicLinkStrategy, sessionStorage } from '~/utils/auth.server'

import { supabaseAdmin } from '~/supabase.server'
import type { ApiError } from '~/supabase.server'

import Footer from '~/components/Layout/Footer'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}))

type LoaderData = {
  error: { message: string } | null
}

type ActionData = {
  error: ApiError | null
}

export const loader: LoaderFunction = async ({ request }) => {
  await magicLinkStrategy.checkSession(request, {
    successRedirect: '/dashboard',
  })

  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  const error = session.get(authenticator.sessionErrorKey) as LoaderData['error']

  return json<LoaderData>({ error })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.clone().formData()
  const email = form?.get('email')

  if (!email) return json({ error: { message: 'Email is required' } }, 400)
  if (typeof email !== 'string') return json({ error: { message: 'Email must be a string' } }, 400)

  const { error } = await supabaseAdmin.auth.api.sendMagicLinkEmail(email, { redirectTo: `${process.env.SERVER_URL}/login/callback` })
  console.log(error)
  if (error) return json({ error: { message: 'Login failed, please try again' } }, error.status)
  return redirect('/login')
}

export default function Login() {
  const transition = useTransition()
  const loading = transition.state === 'submitting'
  const { error } = useActionData<ActionData>() || {}

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#224957d8',
        minHeight: '100vh',
      }}
    >
      {/* dummy div for layout */}
      <Box />
      <Form method='post' style={{ width: 450, background: 'white', borderRadius: 8, padding: 32 }}>
        <Typography variant='h4' component='h1' gutterBottom textAlign={'center'}>
          Login
        </Typography>
        {error && (
          <Typography variant='subtitle1' color={'#ff7300'} textAlign='center'>
            {error.message}
          </Typography>
        )}
        <StyledTextField
          id='email'
          label='Email'
          type='email'
          name='email'
          required
          placeholder='Your email'
          fullWidth
          margin='normal'
          defaultValue={'lionel.ongtzemin@gmail.com'}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type='submit'
            size='large'
            variant='contained'
            className='button'
            sx={{ mt: 2, height: 45, width: '70%' }}
            disabled={loading}
          >
            {transition.submission ? 'Sending you a magic link' : 'Send Magic Link'}
          </Button>
        </Box>
      </Form>
      <Footer />
    </Box>
  )
}
