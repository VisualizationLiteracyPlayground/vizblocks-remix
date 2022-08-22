import * as React from 'react'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useToggle from '~/hooks/useToggle'
import { SavedGraphData } from '~/utils/types'
import { useRootData } from '~/utils/hooks'
import { supabaseClient } from '~/supabase.client'
import { useNavigate } from '@remix-run/react'
import { useGraphData } from '~/utils/graphDataContext'
import { GridRowsProp } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface Props {
  data: SavedGraphData
  // name: string
  // desc: string
  // liked: boolean
  // numLikes: number
}

export default function GraphCard({ data }: Props) {
  const { user } = useRootData()
  const navigate = useNavigate()
  const { graphDispatch } = useGraphData()
  const uid = user?.id ?? ''
  const liked = data.likes.includes(uid)
  const [shadow, setShadow] = React.useState(2)
  const [like, toggleLike] = useToggle(liked)
  const [numLikes, setNumLikes] = React.useState(data.likes.length)

  const handleLike = async () => {
    let newLikes = [...data.likes]
    if (like) {
      setNumLikes(prev => prev - 1)
      newLikes = newLikes.filter(like => like !== uid)
    } else {
      setNumLikes(prev => prev + 1)
      newLikes.push(uid)
    }
    await supabaseClient.from('graphs').upsert({ ...data, likes: newLikes })
    toggleLike()
  }

  const handleClick = () => {
    graphDispatch({ type: data.graph_type, data: data.graph_data.data as GridRowsProp })
    navigate(`../create/${data.graph_type}`, { replace: true })
  }

  return (
    <Card
      sx={{
        width: 400,
        height: 320,
        margin: 4,
        boxShadow: shadow,
        bgcolor: theme => theme.palette.primary.light,
      }}
      onMouseOver={() => setShadow(5)}
      onMouseOut={() => setShadow(2)}
    >
      <CardMedia component='img' height='175' image={data.graph_data.image} alt='Graph Image' sx={{ objectFit: 'fill' }} />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle1'>By {data.graph_data.profile.firstName}</Typography>
          <Button variant='text' color='secondary' onClick={handleClick}>
            Go to {data.graph_type.toLocaleUpperCase()}
          </Button>
        </Box>
        <Typography variant='body2'>{data.graph_data.desc}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={handleLike}>
          <FavoriteIcon color={like ? 'error' : undefined} />
        </IconButton>
        <Typography sx={{ mx: 1 }}>{numLikes ?? 0}</Typography>
        {/* <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  )
}
