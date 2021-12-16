import { Box, Button, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import Link from '@components/Link'
export default function BondActions (props: {
  handleLogout: () => void;
  currentBond: string;
}) {
  const { handleLogout } = props
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Button
        variant="text"
        fullWidth
        startIcon={
          <Box dir="rtl" display="flex">
            <LogoutIcon />
          </Box>
        }
        onClick={handleLogout}
      >
        <Typography fontSize="1rem">Sair</Typography>
      </Button>
      <Link
        href={`/bond/${props.currentBond}`}
        style={{
          textDecoration: 'none',
          width: '100%'
        }}
      >
        <Button
          variant="contained"
          fullWidth
          endIcon={
            <Box display="flex">
              <LoginIcon />
            </Box>
          }
        >
          <Typography fontSize="1rem">Acessar</Typography>
        </Button>
      </Link>
    </Box>
  )
}
