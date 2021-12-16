import {
  Box,
  TextField,
  TextFieldProps
} from '@mui/material'
import { ReactNode } from 'react'
function Input (props: TextFieldProps) {
  return <TextField {...props} fullWidth />
}

function InputBox (props: {
  icon: ReactNode;
  input: ReactNode;
  helper?: ReactNode;
}) {
  const { icon, input, helper } = props
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: '.7rem'
      }}
    >
      {icon}
      {input}
      {helper}
    </Box>
  )
}

export { Input, InputBox }
