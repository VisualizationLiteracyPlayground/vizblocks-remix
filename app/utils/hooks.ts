import * as React from 'react'
import { useMatches } from 'remix'
import { handle as rootHandle, LoaderData as RootLoaderData } from '../root'

export function useMatchLoaderData<LoaderData>(handleId: string) {
  const matches = useMatches()
  const match = matches.find(({ handle }) => handle?.id === handleId)
  if (!match) {
    throw new Error(`No active route has a handle ID of ${handleId}`)
  }
  return match.data as LoaderData
}

export const useRootData = () => useMatchLoaderData<RootLoaderData>(rootHandle.id)
