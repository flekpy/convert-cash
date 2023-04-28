import { ReactNode, SelectHTMLAttributes } from 'react'

import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import styles from './Select.module.scss'

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  sizeStyle: 'small' | 'middle'
  isLoading: boolean
  children: ReactNode
}

export function Select({
  sizeStyle = 'small',
  isLoading = false,
  children,
  ...props
}: ISelectProps): JSX.Element {
  const style =
    sizeStyle === 'small'
      ? styles.selectWrapperSmall
      : styles.selectWrapperMiddle
  return (
    <div className={`${styles.selectWrapper} ${style}`}>
      {isLoading ? (
        <LoadingSpinner spinStart />
      ) : (
        <select {...props}>{children}</select>
      )}
    </div>
  )
}
