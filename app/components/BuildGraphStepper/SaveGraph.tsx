import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import RuleIcon from '@mui/icons-material/Rule'
import { useGraphData } from '~/utils/graphDataContext'

interface SaveGraphProps {}

// TODO: abstract modal from content, e.g. DataGrid, Form, Save menu
const SaveGraph = ({}: SaveGraphProps) => {
  const { data } = useGraphData()

  const objectToCsvString = () => {
    const csvPrefix = 'data:text/csv;charset=utf-8,'
    const csvHeaders: string[] = Object.keys(data[0])
    const csvArray: string[][] = [
      csvHeaders,
      ...data.map(row => {
        const rowArray: string[] = []
        for (let header of csvHeaders) {
          rowArray.push(row[header])
        }
        return rowArray
      }),
    ]
    return csvPrefix + csvArray.map(row => row.join(',')).join('\n')
  }

  // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
  const handleDownloadCsv = () => {
    const csvString = objectToCsvString()
    const encodedUri = encodeURI(csvString)

    const downloadLink = document.createElement('a')
    downloadLink.setAttribute('href', encodedUri)
    downloadLink.setAttribute('download', 'my_graph.csv')
    document.body.appendChild(downloadLink)

    downloadLink.click() // This will download the data file named "my_data.csv".

    document.body.removeChild(downloadLink)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1 }}>
        {data.length > 0 ? (
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ mb: 2 }}>
              You can save and download the plot as a csv file!
            </Typography>

            <Button variant='contained' disableElevation size='large' onClick={handleDownloadCsv}>
              Click here to download
            </Button>
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
