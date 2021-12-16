import { Grid } from '@mui/material'
import { NextPage } from 'next'

const MainGrid: NextPage = ({ children }) => (
    <Grid
      container
      direction="row"
      justifyContent="center"
      height="100vh"
      spacing={2}
    >
        {children}
    </Grid>
)
export default MainGrid
