import styles from './Button.module.scss'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({
  className,
  children,
  ...props
}: IButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className={`${styles.button} ${className}`}
      type={props.type === 'button' ? 'button' : 'submit'}
    >
      {children}
    </button>
  )
}
