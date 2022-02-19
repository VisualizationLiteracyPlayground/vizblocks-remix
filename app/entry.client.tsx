import * as React from 'react'
import { hydrate } from 'react-dom'
import { RemixBrowser } from 'remix'
import { ClientStyleProvider } from './utils/clientStyleContext'

hydrate(
  <ClientStyleProvider>
    <RemixBrowser />
  </ClientStyleProvider>,
  document
)
