import * as React from 'react'
import { Form, LinksFunction } from 'remix'
import { Link, useSearchParams } from 'remix'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Footer from '~/components/Layout/Footer'

export default function Login() {
  const [searchParams] = useSearchParams()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* dummy div for layout */}
      <Box />

      <Box>
        {/* form goes here */}
        <Typography variant='h4' component='h1' gutterBottom>
          Login
        </Typography>
        <Form>
          <input type='hidden' name='redirectTo' value={searchParams.get('redirectTo') ?? undefined} />
          {/* <fieldset>
            <legend className='sr-only'>Login or Register?</legend>
            <label>
              <input type='radio' name='loginType' value='login' defaultChecked /> Login
            </label>
            <label>
              <input type='radio' name='loginType' value='register' /> Register
            </label>
          </fieldset> */}
          <div>
            <label htmlFor='username-input'>Username</label>
            <input type='text' id='username-input' name='username' />
          </div>
          <div>
            <label htmlFor='password-input'>Password</label>
            <input id='password-input' name='password' type='password' />
          </div>
          <button type='submit' className='button'>
            Submit
          </button>
        </Form>
      </Box>

      <Footer />
    </Box>
  )
}
