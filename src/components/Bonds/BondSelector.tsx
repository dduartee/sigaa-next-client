import {
  Box,
  CardContent,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import { Bond } from '@services/api/types/Bonds'
import { useEffect, useState, MouseEvent as ReactMouseEvent } from 'react'

export function BondSelector (props: {
  bonds: Bond[];
  setCurrentBond: (value: string) => void;
  currentBond: string;
}) {
  const { bonds, setCurrentBond, currentBond } = props
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const timeoutOpen = setTimeout(() => {
      setOpen(true)
    }, 200)
    return () => {
      clearTimeout(timeoutOpen)
    }
  }, [])
  return (
    <CardContent>
      <Collapse in={open}>
        <Box textAlign="center">
          <Typography>Escolha um vínculo para acessar</Typography>
          <ToggleButtonGroup
            exclusive
            aria-label=""
            value={currentBond}
            onChange={(
              _event: ReactMouseEvent<HTMLElement, MouseEvent>,
              value: any
            ) => {
              if (!value) {
                setCurrentBond(bonds[0].registration)
              } else {
                setCurrentBond(value)
              }
            }}
            orientation="vertical"
          >
            {bonds.map((value, index) => {
              return (
                <ToggleButton
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#268E36',
                      color: '#ffffff',
                      transition:
                        'background-color .25s cubic-bezier(.4,0,.2,1) 0ms,box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms,border-color .25s cubic-bezier(.4,0,.2,1) 0ms,color .25s cubic-bezier(.4,0,.2,1) 0ms,-webkit-box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms'
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: '#1b7d2b90'
                    }
                  }}
                  key={index}
                  value={value.registration}
                  style={{
                    marginTop: '.5rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    marginBottom: '.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '4px',
                    color: '#fff'
                  }}
                >
                  {value.program}
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>
        </Box>
      </Collapse>
    </CardContent>
  )
}
