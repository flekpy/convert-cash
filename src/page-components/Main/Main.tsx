import SelectWrapper from './SelectWrapper'
import { Table } from '../../components'
import styles from './Main.module.scss'

export function Main(): JSX.Element {
  return (
    <div className={styles.mainWrapper}>
      <SelectWrapper />
      <Table />
    </div>
  )
}
