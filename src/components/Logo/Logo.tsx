import { Link } from 'react-router-dom'

import { LogoIcon } from './LogoIcon'
import styles from './Logo.module.scss'

export function Logo(): JSX.Element {
  return (
    <Link to="/" className={styles.link}>
      <LogoIcon />
      <span>cash</span>
    </Link>
  )
}
