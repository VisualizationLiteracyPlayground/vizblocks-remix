import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import { useLoaderData, useNavigate } from '@remix-run/react'
import * as React from 'react'
import useWindowSize from '~/hooks/useWindowSize'
import { supabaseClient } from '~/supabase.client'
import { useRootData } from '~/utils/hooks'
import { Classroom } from '~/utils/types'

import ListItem from './ListItem'
import { supabaseAdmin } from '~/supabase.server'
import { json, LoaderFunction } from '@remix-run/node'

interface Props {}

const LIST_ITEM_HEIGHT = 200

const getPagination = (page: number, pageSize: number) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  return { from, to }
}

export default function List({}: Props) {
  const [page, setPage] = React.useState(1)
  const [showData, setShowData] = React.useState<Classroom[]>([])
  const [totalClassrooms, setTotalClassrooms] = React.useState(0)
  const { height = 0 } = useWindowSize()

  const navigate = useNavigate()
  const { user } = useRootData()

  const getPageSize = () => {
    if (height > 1200) return 3
    if (height > 1000) return 2
    return 1
  }

  const pageSize = getPageSize()
  const numPages = Math.ceil(totalClassrooms / pageSize)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  React.useEffect(() => {
    const getData = async () => {
      const { from, to } = getPagination(page, pageSize)
      const { data, count } = await supabaseClient
        .from('classroom')
        .select('*', { count: 'exact' })
        .order('created_by', { ascending: false })
        .range(from, to)
      setShowData(data ?? [])
      setTotalClassrooms(count ?? 0)
    }
    getData()
  }, [page, pageSize])

  // React.useEffect(() => {
  //   if (page > numPages) {
  //     setPage(numPages)
  //   }
  // }, [numPages, page])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={numPages} page={page} onChange={handleChange} />
      </div>
      <Box sx={{ mt: 1, overflowY: 'auto', maxHeight: LIST_ITEM_HEIGHT * pageSize }}>
        {showData?.map((item, _) => {
          const { title, created_by, id, likes = [], members = [] } = item
          const handleClick = async () => {
            const uniqueMembers = new Set([...members, user?.id])
            const newMembers = [...uniqueMembers]
            await supabaseClient
              .from('classroom')
              .update({ ...item, members: newMembers })
              .match({ id })
            navigate(id)
          }
          const handleLike = async (newLikes: string[]) => {
            await supabaseClient
              .from('classroom')
              .update({ ...item, likes: newLikes })
              .match({ id })
          }

          return (
            <ListItem
              key={id}
              title={title}
              creator={created_by}
              buttonText='Join'
              onClick={handleClick}
              onLike={handleLike}
              likes={likes}
            />
          )
        })}
      </Box>
    </>
  )
}
