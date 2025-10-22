import { Button } from './ui/Button'

type InviteRegisterButtonProps = {
  onClick?: () => void
  className?: string
  label?: string
}

export const InviteRegisterButton = ({ onClick, className = '', label = 'Register Here' }: InviteRegisterButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      size="md"
      showArrow
      className={className}
      aria-label={label}
    >
      {label}
    </Button>
  )
}

