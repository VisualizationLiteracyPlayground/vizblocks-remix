import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Typography from '@mui/material/Typography'

import InputModal from './InputModal'
import InputData from './InputData'
import AdjustParameters from './AdjustParameters'
import SaveGraph from './SaveGraph'

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
      modalContent: <InputData />,
    },
    {
      label: 'Adjust Parameters',
      modalContent: <AdjustParameters />,
    },
    {
      label: 'Save Graph',
      modalContent: <SaveGraph />,
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
            <InputModal label={`${index + 1}. ${step.label}`} setActive={handleActive(index)}>
              {step.modalContent}
            </InputModal>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
