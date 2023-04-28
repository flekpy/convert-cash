import styles from './Htag.module.scss'

interface IHtagProps {
  tag: 'h1' | 'h2' | 'h3'
  children: React.ReactNode
}

export function Htag({ tag, children }: IHtagProps): JSX.Element {
  switch (tag) {
    case 'h1':
      return <h1 className={styles.h1}>{children}</h1>
    case 'h2':
      return <h2 className={styles.h2}>{children}</h2>

    default:
      return <h3 className={styles.h3}>{children}</h3>
  }
}
