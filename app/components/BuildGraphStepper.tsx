import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '~/utils/theme'

import InputModal from './InputModal'

const steps = [
  { label: 'Input Data', modal: <InputModal label='1. Input Data' /> },
  { label: 'Adjust Parameters', modal: <InputModal label='2. Adjust Parameters' /> },
  { label: 'Save Graph', modal: <InputModal label='3. Save Graph' /> },
]

export default function BuildGraphStepper() {
  // TODO: show active and completed steps
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState<{
    [key: number]: boolean
  }>({})
  const { mode } = useTheme()

  return (
    <Box
      sx={{
        width: '100%',
        p: 5,
        my: 2,
        bgcolor: mode === 'light' ? 'white' : 'black',
        borderRadius: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <Stepper nonLinear>
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              p: 3,
              borderRadius: '10px',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              bgcolor: theme => (mode === 'light' ? theme.palette.primary.main : theme.palette.primary.dark),
              // [`& .MuiStepLabel-label`]: {
              //   fontSize: '1rem',
              // },
            }}
          >
            {/* <StepButton onClick={handleStep(index)} disableTouchRipple>
              {label}
            </StepButton> */}
            {step.modal}
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
