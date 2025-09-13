'use client'

import { actions } from 'astro:actions'
import type { FormEvent, FormHTMLAttributes } from 'preact/compat'
import { useRef, useState } from 'preact/hooks'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'
import { Modal } from '../../components/ui/modal'
import sendIcon from '../../icons/send-icon.svg'
import SuccessModal from './success-modal'

const ContactForm = (props: FormHTMLAttributes<HTMLFormElement>) => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const payload = useRef<EmailPayload>({ name: '', email: '', subject: '', message: '' })
  const formRef = useRef<HTMLFormElement>(null)

  const toggleModal = () => setShowModal(prev => !prev)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    try {
      const { data, error } = await actions.sendEmail({
        name: payload.current.name,
        email: payload.current.email,
        subject: payload.current.subject,
        message: payload.current.message,
      })
      if (error) throw Error(error.message)
      if (data.status !== 'success') throw Error('Error sending email')
      const inputs = formRef.current?.querySelectorAll('input')
      const textareas = formRef.current?.querySelectorAll('textarea')
      inputs?.forEach(input => (input.value = ''))
      textareas?.forEach(input => (input.value = ''))
      toggleModal()
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleChange = (_payload = {}) => {
    payload.current = { ...payload.current, ..._payload }
  }

  return (
    <>
      <form
        {...props}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Input
          placeholder='Nombre'
          name='name'
          onChange={e => handleChange({ name: e.currentTarget.value })}
          disabled={loading}
        />
        <Input
          placeholder='Correo'
          type='email'
          name='email'
          onChange={e => handleChange({ email: e.currentTarget.value })}
          disabled={loading}
        />
        <Input
          placeholder='Asunto'
          name='subject'
          onChange={e => handleChange({ subject: e.currentTarget.value })}
          disabled={loading}
        />
        <Input
          placeholder='Escribe tu mensaje...'
          multiline
          name='message'
          onChange={e => handleChange({ message: e.currentTarget.value })}
          disabled={loading}
        />
        <Button
          type='submit'
          endIconSrc={sendIcon.src}
          loading={loading}
          disabled={loading}
        >
          Enviar mensaje
        </Button>
      </form>

      <Modal
        isOpen={showModal}
        onClose={toggleModal}
        title='Correo enviado'
      >
        <SuccessModal />
      </Modal>
    </>
  )
}

export default ContactForm
