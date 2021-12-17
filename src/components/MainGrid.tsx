import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'

const MainGrid: NextPage = ({ children }) => (
    <Grid
      container
      direction="row"
      justifyContent="center"
      height="100vh"
      spacing={2}
    >
      <Box display="flex" width="90%">
        {children}
      </Box>
    </Grid>
)
export default MainGrid
