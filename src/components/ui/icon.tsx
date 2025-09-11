interface Props {
  src: string
  className?: string
  onClick?: () => void
}

const Icon = ({ src, className, onClick }: Props) => {
  return (
    <svg
      className={className}
      onClick={onClick}
    >
      <use href={src} />
    </svg>
  )
}

export default Icon
