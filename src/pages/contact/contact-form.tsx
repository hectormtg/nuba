'use client'

import { actions } from 'astro:actions'
import type { FormEvent, FormHTMLAttributes } from 'preact/compat'
import { useRef } from 'preact/hooks'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'
import sendIcon from '../../icons/send-icon.svg'

const ContactForm = (props: FormHTMLAttributes<HTMLFormElement>) => {
  const payload = useRef<EmailPayload>({ name: '', email: '', subject: '', message: '' })
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data, error } = await actions.sendEmail({
        name: payload.current.name,
        email: payload.current.email,
        subject: payload.current.subject,
        message: payload.current.message,
      })
      console.log('Data: ', data)
      if (error) throw Error(error.message)
      if (data.status !== 'success') throw Error('Error sending email')
      const inputs = formRef.current?.querySelectorAll('input')
      const textareas = formRef.current?.querySelectorAll('textarea')
      inputs?.forEach(input => (input.value = ''))
      textareas?.forEach(input => (input.value = ''))
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (_payload = {}) => {
    payload.current = { ...payload.current, ..._payload }
  }

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Input
        placeholder='Nombre'
        name='name'
        onChange={e => handleChange({ name: e.currentTarget.value })}
      />
      <Input
        placeholder='Correo'
        type='email'
        name='email'
        onChange={e => handleChange({ email: e.currentTarget.value })}
      />
      <Input
        placeholder='Asunto'
        name='subject'
        onChange={e => handleChange({ subject: e.currentTarget.value })}
      />
      <Input
        placeholder='Escribe tu mensaje...'
        multiline
        name='message'
        onChange={e => handleChange({ message: e.currentTarget.value })}
      />
      <Button
        type='submit'
        endIconSrc={sendIcon.src}
      >
        Enviar mensaje
      </Button>
    </form>
  )
}

export default ContactForm
