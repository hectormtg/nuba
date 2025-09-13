import type { HTMLAttributes } from 'preact/compat'
import clsx from 'clsx'
import styles from './spinner.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const Spinner = ({ className, size = 'sm', ...props }: Props) => {
  return (
    <div
      className={clsx(styles.spinner, styles[`spinner--${size}`], className)}
      {...props}
    />
  )
}

export default Spinner
