import clsx from 'clsx'
import type { ButtonHTMLAttributes, HTMLAttributes } from 'preact/compat'
import styles from './button.module.scss'
import Icon from './icon'
import Spinner from './spinner'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
  loading?: boolean
  endIconSrc?: string
  href?: string
}

const Button = ({ loading, endIconSrc, children, href, ...props }: Props) => {
  if (href) {
    return (
      <a
        href={href}
        {...(props as HTMLAttributes<HTMLAnchorElement>)}
        className={clsx(
          styles.button,
          styles.filled,
          endIconSrc && styles.endIconButton,
          props.className
        )}
        type='button'
      >
        <span>{children}</span>
        {endIconSrc && <div className={styles.iconContainer}>{<Icon src={endIconSrc} />}</div>}
      </a>
    )
  }

  return (
    <button
      {...(props as HTMLAttributes<HTMLButtonElement>)}
      className={clsx(
        styles.button,
        styles.filled,
        endIconSrc && styles.endIconButton,
        !props.disabled && !loading && styles.enabled,
        props.className
      )}
    >
      <span>{children}</span>
      {loading && (
        <div className={styles.iconContainer}>
          <Spinner />
        </div>
      )}
      {endIconSrc && !loading && (
        <div className={styles.iconContainer}>
          <Icon src={endIconSrc} />
        </div>
      )}
    </button>
  )
}

export default Button
