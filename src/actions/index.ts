import { defineAction } from 'astro:actions'
import { Resend } from 'resend'
import { SETTINGS } from '../constants/settings.constants'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
  sendEmail: defineAction({
    handler: async (payload: EmailPayload) => {
      try {
        if (SETTINGS.EMAILS_DISABLED) {
          throw Error('Emails disabled')
        }

        const { name, email, subject, message } = payload
        if (!name || !email || !subject || !message) {
          throw Error('Invalid payload')
        }

        const { data, error } = await resend.emails.send({
          from: 'Nuba Projects <info@nuba.pro>',
          to: ['info@nuba.pro', 'hectormtg@gmail.com'],
          subject: `Inquiry from Nuba web site | ${name}`,
          html: `<div>
          <p>Client Name: <strong>${name}</strong></p>
          <p>Email: <strong>${email}</strong></p>
          <p>Subject: <strong>${subject}</strong></p>
          <p>Message: <strong>${message}</strong></p>
          </div>`,
        })

        if (error) throw Error(error.message)
        return { status: 'success' }
      } catch (err: any) {
        return { status: 'error', message: err.message }
      }
    },
  }),
}
