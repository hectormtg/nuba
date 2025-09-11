'use client'

import styles from './navbar.module.scss'
import clsx from 'clsx'
import { getPathnameRegex } from '../utils/helpers'
import logo from '../assets/logo.svg'
import Icon from './ui/icon'
import { Modal } from './ui/modal'
import { useState, useRef, useEffect } from 'preact/hooks'
import barsIcon from '../icons/bars-icon.svg'
import MobileDrawer from './mobile-drawer'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { NAVBAR_OPTIONS } from '../constants/navbar.constants'
import type { NavbarOption } from '../types/navbar-option.types'
import { STYLE_DEFAULTS } from '../constants/styles.constants'

const Navbar = ({ pathname }: { pathname: string }) => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return null

  const toggleModal = () => {
    setShowModal(prev => !prev)
  }

  const regex = getPathnameRegex(pathname)

  const handleClick = (option: NavbarOption) => {
    const sectionId = `section-${option.elementId}`
    const section = document.getElementById(sectionId)
    if (!section) return
    const rect = section.getBoundingClientRect()
    window.scrollTo({
      top: rect.top + window.scrollY - STYLE_DEFAULTS.NAVBAR_SIZE,
      behavior: 'smooth',
    })
  }

  const navbarRef = useRef<HTMLDivElement>(null)
  const observer = useIntersectionObserver({
    onEntering: () => {
      if (!navbarRef.current) return
      navbarRef.current.classList.remove('scrolled')
    },
    onLeaving: () => {
      if (!navbarRef.current) return
      navbarRef.current.classList.add('scrolled')
    },
  })

  return (
    <>
      <div
        class={styles.wrapper}
        ref={navbarRef}
      >
        <nav class={styles.navbar}>
          <Icon
            src={logo.src}
            className={styles.logo}
          />
          <div class={styles.options}>
            {NAVBAR_OPTIONS.map(option => (
              <span
                class={clsx(styles.option, regex.test(option.elementId) && styles.active)}
                id='navbar-link'
                data-section-id={option.elementId}
                onClick={() => handleClick(option)}
              >
                {option.title}
              </span>
            ))}
          </div>
          <Icon
            src={barsIcon.src}
            className={styles.drawerButton}
            onClick={toggleModal}
          />
        </nav>
      </div>
      <div ref={observer}></div>

      <Modal
        isOpen={showModal}
        onClose={toggleModal}
      >
        <MobileDrawer onClose={toggleModal} />
      </Modal>
    </>
  )
}

export default Navbar
