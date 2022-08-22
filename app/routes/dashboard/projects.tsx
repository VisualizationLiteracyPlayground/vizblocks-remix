import * as React from 'react'
import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MyGraphs from '~/components/MyGraphs'
import { supabaseAdmin } from '~/supabase.server'
import { SavedGraphData } from '~/utils/types'

type LoaderData = SavedGraphData[] | null

export const loader: LoaderFunction = async ({ request }) => {
  const { data, error } = await supabaseAdmin.from('graphs').select()
  return json<LoaderData>(data)
}

export default function Projects() {
  const data = useLoaderData<LoaderData>() ?? []

  return (
    <div style={{ padding: 16 }}>
      <MyGraphs graphData={data} />
    </div>
  )
}
