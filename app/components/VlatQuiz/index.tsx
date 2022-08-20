import * as React from 'react'

import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'

import { useTheme } from '~/utils/theme'

import { Question } from '~/constants'

interface Props {
  question: Question[]
  questionNum: number
  onUpdate: (points: number) => void
}

export default function VlatQuiz({ question, questionNum, onUpdate }: Props) {
  const numQuestions = question.length - 1 // first question is the description
  const initPointsArray = new Array(numQuestions).fill(0)
  const [points, setPoints] = React.useState(initPointsArray)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, qnNum: number, correctAnswer = 0) => {
    const answer = (event.target as HTMLInputElement).value
    const isCorrect = parseInt(answer, 10) === correctAnswer
    const newPoints = [...points]
    newPoints[qnNum - 1] = isCorrect ? 1 : 0
    setPoints(newPoints)

    const totalPoints = newPoints.reduce((partialSum, a) => partialSum + a, 0)
    onUpdate(totalPoints)
  }

  return (
    <>
      {question.map((data, index) => {
        const { question, questionPic, answers = [], correctAnswer } = data
        return (
          <FormControl key={index} sx={{ width: '100%' }}>
            <Typography sx={{ my: 2 }}>
              <strong>
                {questionNum}.{index}
              </strong>{' '}
              {question}
            </Typography>
            <RadioGroup color='black' onChange={e => handleChange(e, index, correctAnswer)}>
              {answers.map((answer, index) => {
                const optionNum = index + 1
                return <FormControlLabel key={index} value={optionNum} control={<Radio sx={{ color: '#6cddaa' }} />} label={answer} />
              })}
            </RadioGroup>
            <Typography variant='body1'></Typography>
            {questionPic && <img src={questionPic} alt='test question' style={{ alignSelf: 'center' }} />}
          </FormControl>
        )
      })}
      <Divider sx={{ my: 2 }} />
    </>
  )
}
