import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useTheme } from '~/utils/theme'
import { IconButton } from '@mui/material'
import { Form, Link, useTransition } from '@remix-run/react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import QuestionTemplate from './QuestionTemplate'
import { ActionFunction, json, redirect } from '@remix-run/node'
import { supabaseAdmin } from '~/supabase.server'
import { magicLinkStrategy } from '~/utils/auth.server'
import { Question } from '~/constants'
import { GRAPH_TYPES } from '~/utils/types'

interface Props {
  questions: Question[][]
  type: GRAPH_TYPES
}

const getInitialScore = (question: any[]) => {
  const score: Record<number, number> = {}
  question.forEach((_, index) => {
    score[index + 1] = 0
  })
  return score
}

const getInitialCompletionStatus = (question: any[]) => {
  const completed: Record<number, boolean> = {}
  question.forEach((_, index) => {
    completed[index + 1] = false
  })
  return completed
}

export default function VlatQuiz({ questions, type }: Props) {
  const transition = useTransition()
  const loading = transition.state === 'submitting'
  const { mode } = useTheme()

  const [score, setScore] = React.useState(getInitialScore(questions))
  const [isCompleted, setIsCompleted] = React.useState(getInitialCompletionStatus(questions))

  const handleUpdate = (qnNum: number, points: number) => {
    setScore(prev => ({ ...prev, [qnNum]: points }))
  }

  const handleCompleted = (qnNum: number, isCompleted: boolean) => {
    setIsCompleted(prev => ({ ...prev, [qnNum]: isCompleted }))
  }

  const totalScore = Object.values(score).reduce((total, qnScore) => total + qnScore, 0)
  const completed = Object.values(isCompleted).every(value => value)

  return (
    <div style={{ padding: 16 }}>
      <Box
        sx={{
          width: '100%',
          p: 4,
          my: 2,
          bgcolor: mode === 'light' ? 'white' : 'black',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          height: '87vh',
          overflowY: 'scroll',
        }}
      >
        <Box sx={{ position: 'sticky', top: 0 }}>
          <IconButton component={Link} to='/dashboard/vlat/pre-assessment'>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography variant='h4' sx={{ mb: 4 }} textAlign='center'>
          VLAT Pre-Assessment: {type}
        </Typography>

        <Box sx={{ pl: 8 }}>
          {questions.map((question, index) => {
            const qnNum = index + 1
            return (
              <QuestionTemplate
                key={index}
                questionNum={qnNum}
                question={question}
                onUpdate={handleUpdate}
                onCheckCompleted={handleCompleted}
              />
            )
          })}
        </Box>

        <Box component={Form} method='post' sx={{ pl: 8, mb: 4, display: 'flex', justifyContent: 'center' }}>
          <input type='hidden' name='totalScore' value={totalScore} />
          <Button variant='contained' type='submit' size='large' sx={{ width: 200 }} disabled={!completed || loading}>
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  )
}
