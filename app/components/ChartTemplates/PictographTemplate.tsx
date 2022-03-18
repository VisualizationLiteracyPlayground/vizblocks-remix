import * as React from 'react'
import { Typography } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '~/utils/theme'

import AppleIcon from '@mui/icons-material/Apple'
import FlightIcon from '@mui/icons-material/Flight'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import RocketIcon from '@mui/icons-material/Rocket'
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat'

interface PictographTemplateProps {
  data: any
  title?: string
  xlabel?: string
  ylabel?: string
  name?: string
}

const Icon: React.FC<any> = (props: any) => {
  // console.log(props) to see all the props related to <Bar />
  const { x, y, value, height, width, category, fill } = props
  // final position >> width = width * 2
  // each interval >> x - (width / value)
  const X_VALUES = new Array(value).fill(0).map((_, index) => x - (width / value) * index)

  return (
    <>
      {X_VALUES.map((xValue, index) => {
        return (
          <svg key={`${category}-${index}`}>
            {category === 'Apple' && <AppleIcon height={height} width={width * 2} x={xValue} y={y} sx={{ color: fill }} />}
            {category === 'Plane' && <FlightIcon height={height} width={width * 2} x={xValue} y={y} />}
            {category === 'Boat' && <DirectionsBoatIcon height={height} width={width * 2} x={xValue} y={y} />}
            {category === 'Car' && <DirectionsCarIcon height={height} width={width * 2} x={xValue} y={y} />}
            {category === 'Rocket' && <RocketIcon height={height} width={width * 2} x={xValue} y={y} />}
          </svg>
        )
      })}
    </>
  )
}

// set ResponsiveContainer width=99% to respond to window size changes
// see https://github.com/recharts/recharts/issues/172#issuecomment-307858843
export function PictographTemplate({ data, title, xlabel, ylabel, name }: PictographTemplateProps) {
  const { mode } = useTheme()

  return (
    <>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <ResponsiveContainer width='99%' height='100%'>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 60,
          }}
          layout='vertical'
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis type='number' />
          <YAxis dataKey='category' type='category' />
          <Bar dataKey='value' name={name} fill='#82ca9d' shape={<Icon />} maxBarSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
