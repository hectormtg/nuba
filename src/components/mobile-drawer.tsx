import { NAVBAR_OPTIONS } from '../constants/navbar.constants'
import { STYLE_DEFAULTS } from '../constants/styles.constants'
import type { NavbarOption } from '../types/navbar-option.types'
import styles from './mobile-drawer.module.scss'

interface Props {
  onClose: () => void
}

const MobileDrawer = ({ onClose }: Props) => {
  const handleClick = (option: NavbarOption) => {
    onClose()
    const sectionId = `section-${option.elementId}`
    const section = document.getElementById(sectionId)
    if (!section) return
    const rect = section.getBoundingClientRect()
    window.scrollTo({
      top: rect.top + window.scrollY - STYLE_DEFAULTS.NAVBAR_SIZE,
      behavior: 'smooth',
    })
  }

  return (
    <div className={styles.container}>
      {NAVBAR_OPTIONS.map((option, index) => (
        <Option
          option={option}
          onClick={() => handleClick(option)}
          index={index}
        />
      ))}
    </div>
  )
}

export default MobileDrawer

interface OptionProps {
  option: NavbarOption
  onClick: () => void
  index: number
}

const Option = ({ option, onClick, index }: OptionProps) => {
  return (
    <span
      className='fade-in-right'
      onClick={onClick}
      style={{
        animationDelay: `${index * 0.2}s`,
      }}
    >
      {option.title}
    </span>
  )
}
