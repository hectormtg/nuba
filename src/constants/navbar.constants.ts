import type { NavbarOption } from '../types/navbar-option.types'
import { SETTINGS } from './settings.constants'

export const NAVBAR_OPTIONS: Array<NavbarOption> = [
  // { title: 'Home', elementId: '/', icon: 'home-icon' },
  { title: 'Nosotros', elementId: 'about', icon: 'user-icon' },
  { title: 'Servicios', elementId: 'services', icon: 'portfolio-icon' },
  !SETTINGS.EMAILS_DISABLED && { title: 'Contacto', elementId: 'contact', icon: 'message-icon' },
].filter(item => !!item)
