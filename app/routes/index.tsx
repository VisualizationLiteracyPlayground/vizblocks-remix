import * as React from 'react'
import type { ActionFunction } from 'remix'
import { authenticator } from '~/utils/auth.server'
import Landing from '~/components/Landing'

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate('sb-magic-link', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <>
      <Landing />
    </>
  )
}
