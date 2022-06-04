import { styled, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useSubmit, useTransition } from '@remix-run/react'
import type { ApiError, User } from '@supabase/supabase-js'
import * as React from 'react'
import { supabaseAdmin } from '~/supabase.server'
import { magicLinkStrategy } from '~/utils/auth.server'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}))

type ActionData = {
  error: ApiError | null
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.clone().formData()
  const id = form?.get('userId')
  const firstName = form?.get('firstName')
  const lastName = form?.get('lastName')

  if (!firstName) return json({ error: { message: 'First name is required' } }, 400)
  if (typeof firstName !== 'string') return json({ error: { message: 'First name must be a string' } }, 400)

  if (!lastName) return json({ error: { message: 'Last name is required' } }, 400)
  if (typeof lastName !== 'string') return json({ error: { message: 'Last name must be a string' } }, 400)

  const { data, error } = await supabaseAdmin.from('profiles').upsert({ id, firstName, lastName })
  console.log('>>>', data, error)
  if (error) return json({ error: { message: error.message } }, 400)
  return null
}

type LoaderData = { userId?: string; firstName?: string; lastName?: string; email?: string }

export const loader: LoaderFunction = async ({ request }) => {
  const session = await magicLinkStrategy.checkSession(request)
  const { data, error } = await supabaseAdmin.from('profiles').select().eq('id', session?.user?.id)
  const profile = {
    userId: session?.user?.id,
    firstName: data ? data[0].firstName : '',
    lastName: data ? data[0].lastName : '',
    email: session?.user?.email,
  }

  return json<LoaderData>(profile)
}

export default function Profile() {
  const transition = useTransition()
  const loading = transition.state === 'submitting'
  const { error } = useActionData<ActionData>() || {}
  const { userId, firstName, lastName, email } = useLoaderData<LoaderData>()

  return (
    <Form
      method='post'
      style={{
        position: 'relative',
        top: '25%',
        width: '50%',
        background: 'white',
        borderRadius: 8,
        padding: 32,
        margin: 'auto',
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom textAlign={'center'}>
        Edit Profile
      </Typography>
      {error && (
        <Typography variant='subtitle1' color={'#ff7300'} textAlign='center'>
          {error.message}
        </Typography>
      )}
      <input type='hidden' name='userId' value={userId} />
      <StyledTextField label='First Name' type='text' name='firstName' fullWidth margin='normal' defaultValue={firstName} required />
      <StyledTextField label='Last Name' type='text' name='lastName' fullWidth margin='normal' defaultValue={lastName} required />
      <StyledTextField label='Email' type='email' name='email' fullWidth margin='normal' disabled defaultValue={email} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          type='submit'
          size='large'
          variant='contained'
          className='button'
          sx={{ mt: 2, height: 45, width: '70%' }}
          disabled={loading}
        >
          Update
        </Button>
      </Box>
    </Form>
  )
}
