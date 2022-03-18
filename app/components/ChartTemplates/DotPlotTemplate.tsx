import * as React from 'react'
import { Typography } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme } from '~/utils/theme'

interface DotPlotTemplateProps {
  data: any
  title?: string
  xlabel?: string
  ylabel?: string
  name?: string
}

interface DotsProps {
  height: number
  width: number
  fill: string
  x: number
  y: number
  yval: number
}

const Dots: React.FC<DotsProps> = ({ x, y, yval, height, width, fill }, props) => {
  // console.log(props)
  const DOTS_CY_VALUE = new Array(yval).fill(0).map((_, index) => y + (height / yval) * index)

  return (
    <svg>
      {DOTS_CY_VALUE.map((cyValue, index) => {
        return <circle key={index} cx={x + width / 2} cy={cyValue} r='10' fill={fill} />
      })}
    </svg>
  )
}

// set ResponsiveContainer width=99% to respond to window size changes
// see https://github.com/recharts/recharts/issues/172#issuecomment-307858843
export function DotPlotTemplate({ data, title, xlabel, ylabel, name }: DotPlotTemplateProps) {
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
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='xval' label={{ value: xlabel, position: 'bottom', fill: mode === 'light' ? '#000' : '#fff' }} scale='band' />
          <YAxis label={{ value: ylabel, angle: -90, position: 'left', fill: mode === 'light' ? '#000' : '#fff' }} />
          {/* <Tooltip labelStyle={{ color: 'black' }} /> */}
          <Bar dataKey='yval' name={name} fill='#82ca9d' shape={<Dots />} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
