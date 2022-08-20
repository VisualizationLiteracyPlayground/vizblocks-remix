import * as React from 'react'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useToggle from '~/hooks/useToggle'

interface Props {
  data: any
  // name: string
  // desc: string
  // liked: boolean
  // numLikes: number
}

export default function GraphCard({ data }: Props) {
  const liked = data?.likes.includes(2) // 2 === userId
  const [shadow, setShadow] = React.useState(2)
  const [like, toggleLike] = useToggle(liked)

  const numLikes = data?.likes.length + Number(like)

  return (
    <Card
      sx={{
        width: 345,
        height: 345,
        margin: 4,
        boxShadow: shadow,
        bgcolor: theme => theme.palette.primary.light,
      }}
      onMouseOver={() => setShadow(5)}
      onMouseOut={() => setShadow(2)}
    >
      <CardMedia
        component='img'
        height='200'
        image='https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
        alt='Paella dish'
      />
      <CardContent>
        <Typography variant='subtitle1'>By {data?.name}</Typography>
        <Typography variant='body2'>{data?.desc}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={toggleLike}>
          <FavoriteIcon color={like ? 'error' : undefined} />
        </IconButton>
        <Typography>{numLikes ?? 0}</Typography>
        {/* <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  )
}
