import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Typography from '@mui/material/Typography'

import InputData from './InputData'
import AdjustParameters from './AdjustParameters'

import { useTheme } from '~/utils/theme'
import { useGraphData } from '~/utils/graphDataContext'

export default function BuildGraphStepper() {
  const [activeStep, setActiveStep] = React.useState(-1)
  const [completed, setCompleted] = React.useState<{ [key: number]: boolean }>({})
  const { mode } = useTheme()
  const { columnTemplate } = useGraphData()

  const handleActive = (step: number) => () => {
    setActiveStep(step)
    setCompleted(prevState => ({ ...prevState, [activeStep]: true }))
  }

  const isActive = (step: number) => {
    const isCompleted = completed.hasOwnProperty(step)
    const isCurrent = activeStep === step
    return isCompleted || isCurrent
  }

  const steps = [
    {
      label: 'Input Data',
      modal: <InputData label='1. Input Data' columns={columnTemplate} setActive={handleActive(0)} />,
    },
    {
      label: 'Adjust Parameters',
      modal: <AdjustParameters label='2. Adjust Parameters' columns={columnTemplate} setActive={handleActive(1)} />,
    },
    {
      label: 'Save Graph',
      modal: <InputData label='3. Save Graph' columns={columnTemplate} setActive={handleActive(2)} />,
    },
  ]

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
              borderRadius: '10px',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              bgcolor: theme => {
                if (isActive(index)) {
                  return mode === 'light' ? theme.palette.primary.main : theme.palette.primary.dark
                } else {
                  return mode === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
                }
              },
              [`& .MuiButton-root`]: {
                color: theme => (isActive(index) ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText),
              },
            }}
          >
            {step.modal}
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
