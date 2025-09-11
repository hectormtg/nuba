import clsx from 'clsx'
import type { HTMLAttributes, InputHTMLAttributes } from 'preact/compat'
import styles from './input.module.scss'

interface Props extends InputHTMLAttributes {
  multiline?: boolean
}

const Input = ({ multiline, ...props }: Props) => {
  if (multiline) {
    return (
      <textarea
        {...(props as HTMLAttributes<HTMLTextAreaElement>)}
        className={clsx(styles.textarea, props.className)}
      ></textarea>
    )
  }

  return (
    <input
      {...(props as HTMLAttributes<HTMLInputElement>)}
      type={props.type || 'text'}
    />
  )
}

export default Input
