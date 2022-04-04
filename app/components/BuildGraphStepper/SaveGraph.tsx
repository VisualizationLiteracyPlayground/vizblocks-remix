import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import RuleIcon from '@mui/icons-material/Rule'
import domtoimage from 'dom-to-image'
import fileDownload from 'js-file-download'
import { useGraphData } from '~/utils/graphDataContext'
import { objectToCsvString, handleDownloadCsv } from './utils'

interface SaveGraphProps {}

// TODO: options to save an image of the graph or csv

// round 1 >> get feedback, without explaining how to use it. record the screen
// collate feedback

const SaveGraph = ({}: SaveGraphProps) => {
  const { data } = useGraphData()

  const csvString = objectToCsvString(data)
  const handleCsvDownload = React.useCallback(() => handleDownloadCsv(csvString), [csvString])
  const handlePngDownload = React.useCallback(async () => {
    const node = document.getElementById('chart-container')
    const blob = await domtoimage.toBlob(node as Node, { bgcolor: '#fff' })
    fileDownload(blob, 'chart.png')
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1 }}>
        {data.length > 0 ? (
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ mb: 2 }}>
              You can save and download your chart!
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '8px' }}>
              <Button variant='contained' disableElevation size='large' onClick={handleCsvDownload}>
                Download as CSV
              </Button>
              <Button variant='contained' disableElevation size='large' onClick={handlePngDownload}>
                Download as Image
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Please input some data first!
            </Typography>
            <RuleIcon fontSize='large' sx={{ m: 1 }} />
          </>
        )}
      </Box>
    </>
  )
}

export default SaveGraph
