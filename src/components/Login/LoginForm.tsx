import { InputBox } from '@components/Login/Input'
import { AccountCircle, Lock, AccountBalance } from '@mui/icons-material'
import {
  FormControl,
  TextField,
  MenuItem,
  Collapse,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material'
import { IInstitutionInfo } from '@services/api/types/Institutions'
import { LoginOptions } from '@services/api/types/Login'
import { ChangeEvent, DetailedHTMLProps, FormHTMLAttributes, SyntheticEvent, useEffect, useState } from 'react'

export default function LoginForm (
  props: DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > & {
    hooks: {
      credentialsHooks : {
        credentials: {username: string, password: string, token: undefined};
        setCredentials: (credentials: {username: string, password: string, token: undefined}) => void;
      },
      optionsHooks: {
        options: LoginOptions & {rememberMe: boolean};
        setOptions: (options: LoginOptions & {rememberMe: boolean}) => void;
      },
      error: boolean;
    },
    institutions: IInstitutionInfo[]
  }
) {
  // TRANSIÇÕES
  const [openInstitution, setOpenInstitution] = useState(false)
  const [openCheckbox, setOpenCheckbox] = useState(false)
  const [openUsername, setOpenUsername] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)
  useEffect(() => {
    const timeoutOpenUsername = setTimeout(() => {
      setOpenUsername(true)
    }, 100)
    const timeoutOpenPassword = setTimeout(() => {
      setOpenPassword(true)
    }, 400)
    const timeoutOpenInstitution = setTimeout(() => {
      setOpenInstitution(true)
    }, 600)
    const timeoutOpenCheckbox = setTimeout(() => {
      setOpenCheckbox(true)
    }, 800)
    return () => {
      clearTimeout(timeoutOpenUsername)
      clearTimeout(timeoutOpenPassword)
      clearTimeout(timeoutOpenInstitution)
      clearTimeout(timeoutOpenCheckbox)
    }
  }, [])

  const { hooks, institutions } = props
  const { credentialsHooks, optionsHooks, error } = hooks
  const { options, setOptions } = optionsHooks
  const { credentials, setCredentials } = credentialsHooks
  const onChangeCredentials = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }
  const onChangeInstitutionAndUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const [institution, url] = event.target.value.split(' | ')
    setOptions({
      ...options,
      url,
      institution
    })
  }
  const onChangeRememberMe = (_event: SyntheticEvent<Element, Event>, checked: boolean) => {
    setOptions({
      ...options,
      rememberMe: checked
    })
  }
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      autoComplete="on"
      {...props}
    >
      <Collapse style={{ width: '100%' }} in={openUsername} timeout={200}>
        <InputBox
          icon={
            <AccountCircle
              sx={{ color: 'action.active', mr: 1, marginBottom: '20px' }}
            />
          }
          input={
            <FormControl fullWidth>
              <TextField
                onChange={onChangeCredentials}
                value={credentials.username ?? ''}
                error={error}
                name="username"
                label="Usuário"
                size="small"
                autoComplete="username"
                fullWidth
                helperText="Seu usuário na SIGAA"
              />
            </FormControl>
          }
        />
      </Collapse>
      <Collapse style={{ width: '100%' }} in={openPassword} timeout={400}>
        <InputBox
          icon={
            <Lock
              sx={{ color: 'action.active', mr: 1, marginBottom: '20px' }}
            />
          }
          input={
            <FormControl fullWidth>
              <TextField
                onChange={onChangeCredentials}
                value={credentials.password ?? ''}
                error={error}
                name="password"
                label="Senha"
                size="small"
                fullWidth
                autoComplete="current-password"
                type="password"
                helperText="Sua senha do SIGAA"
              />
            </FormControl>
          }
        />
      </Collapse>
      <Collapse style={{ width: '100%' }} in={openInstitution} timeout={600}>
        <InputBox
          icon={
            <AccountBalance
              sx={{ color: 'action.active', mr: 1, marginBottom: '20px' }}
            />
          }
          input={
            <FormControl fullWidth sx={{ minWidth: 210 }}>
              <TextField
                error={error}
                id="outlined-select-currency"
                select
                value={
                  options.institution
                    ? `${options.institution} | ${options.url}`
                    : ''
                }
                label="Instituição"
                onChange={onChangeInstitutionAndUrl}
                size="small"
                helperText="Selecione sua instituição"
                fullWidth
              >
                {institutions.map((institution) => (
                  <MenuItem
                    key={institution.abbreviation}
                    value={`${institution.abbreviation} | ${institution.url}`}
                    disabled={!institution.status}
                  >
                    {institution.abbreviation} - {institution.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          }
        />
      </Collapse>
      <Collapse in={openCheckbox} sx={{ width: '100%' }}>
        <FormGroup>
          <FormControlLabel
            style={{ userSelect: 'none' }}
            control={<Checkbox />}
            label="Lembrar de mim"
            value={options.rememberMe}
            onChange={onChangeRememberMe}
          />
        </FormGroup>
      </Collapse>
    </form>
  )
}
