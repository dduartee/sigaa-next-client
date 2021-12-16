import { DetailedHTMLProps, FormHTMLAttributes } from 'react'

export default function LoginBox (
  props: DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
) {
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      {...props}
    ></form>
  )
}
