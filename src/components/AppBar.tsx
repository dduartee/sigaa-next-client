import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Menu as MenuIcon } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'

export default function CustomAppBar () {
  return (
    <Box sx={{ flexGrow: 1, width: '100%', marginBottom: 1 }}>
      <AppBar position="fixed" sx={{ borderRadius: '9px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div>
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </div>
          <div style={{ width: '25rem' }}>
            <TextField
              id="pesquisar"
              label=""
              variant="outlined"
              color="primary"
              margin="normal"
              size="small"
              placeholder="Pesquisar "
              fullWidth
            />
          </div>
          <div>
            <IconButton>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
