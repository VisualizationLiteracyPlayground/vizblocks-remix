import * as React from 'react'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useToggle from '~/hooks/useToggle'

export default function GraphCard() {
  const [shadow, setShadow] = React.useState(2)
  const [liked, toggleLike] = useToggle()

  return (
    <Card
      sx={{
        width: 345,
        height: 345,
        margin: 1,
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
        <Typography variant='subtitle1'>By XXX</Typography>
        <Typography variant='body2'>Some description</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={toggleLike}>
          <FavoriteIcon color={liked ? 'error' : undefined} />
        </IconButton>
        {/* <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  )
}
