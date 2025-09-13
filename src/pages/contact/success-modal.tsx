import Icon from '../../components/ui/icon'
import styles from './success-modal.module.scss'
import icon from '../../icons/envelope-icon.svg'

const SuccessModal = () => {
  return (
    <div class={styles.container}>
      <div class={styles.iconContainer}>
        <Icon src={icon.src} />
      </div>
      <p>
        Hemos recibido tu correo, <br /> pronto nos comunicaremos contigo.
      </p>
    </div>
  )
}
export default SuccessModal
