import { Link } from 'react-router-dom'

import { Logo } from '../../components'
import ExchangeIcon from './ExchangeIcon'
import styles from './Header.module.scss'

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Logo />
      <Link to="/converter" className={styles.link}>
        <ExchangeIcon />
        <span>обмен</span>
      </Link>
    </header>
  )
}
