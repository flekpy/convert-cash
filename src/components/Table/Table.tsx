import { useSelector } from 'react-redux'

import styles from './Table.module.scss'
import { RootState } from '../../store'

export function Table(): JSX.Element {
  const quotesList = useSelector(
    (state: RootState) => state.currency.quotesList
  )

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {quotesList?.length
            ? quotesList.map(({ nameCurrency, value }) => (
              <tr key={nameCurrency + value}>
                <td>{nameCurrency}</td>
                <td>{value}</td>
              </tr>
            ))
            : null}
        </tbody>
      </table>
    </div>
  )
}
