import * as React from 'react'
import MyGraphs from '~/components/MyGraphs'

const mock = [
  {
    userId: 1,
    name: 'test123',
    desc: 'hello everyone',
    likes: [1],
  },
  {
    userId: 2,
    name: 'test123',
    desc: 'hello everyone',
    likes: [1],
  },
  {
    userId: 3,
    name: 'test123',
    desc: 'hello everyone',
    likes: [1],
  },
  {
    userId: 4,
    name: 'test123',
    desc: 'hello everyone',
    likes: [1],
  },
  {
    userId: 5,
    name: 'test123',
    desc: 'hello everyone',
    likes: [1],
  },
  {
    userId: 6,
    name: 'test123',
    desc: 'hello everyone',
    likes: [1],
  },
  {
    userId: 7,
    name: 'test123',
    desc: 'hello everyone',
    likes: [1],
  },
]

//TODO: any type

const groupBy2 = (items: any[]) => {
  const result: any[] = []

  items.forEach((item, index) => {
    if ((index + 1) % 2 === 0) return
    const group = [item, items?.[index + 1]]
    result.push(group)
  })

  return result
}

export default function Projects() {
  const groupedData = groupBy2(mock)
  return (
    <div style={{ padding: 16 }}>
      <MyGraphs graphData={groupedData} />
    </div>
  )
}
