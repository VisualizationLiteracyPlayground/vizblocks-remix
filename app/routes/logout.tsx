import { useEffect } from 'react'
import { ActionFunction, useSubmit } from 'remix'
import { authenticator } from '~/utils/auth.server'

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/' })
}

export default function Logout() {
  const submit = useSubmit()

  useEffect(() => {
    const formData = new FormData()
    submit(formData, { method: 'post' })
  }, [submit])

  return null
}
