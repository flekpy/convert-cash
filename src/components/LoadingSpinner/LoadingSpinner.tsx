import { SVGProps } from 'react'

import IconLoading from './IconLoading'
import styles from './Loading.module.scss'

interface ISpinnerProps extends SVGProps<SVGSVGElement> {
  spinStart: boolean
}

export function LoadingSpinner({
  spinStart = true,
  ...props
}: ISpinnerProps): JSX.Element {
  return (
    <div className={styles.loadingWrapper}>
      <IconLoading
        className={spinStart ? styles.spinner : ''}
        fill="none"
        strokeWidth={2.5}
        stroke="#5286D0"
        {...props}
      />
    </div>
  )
}
