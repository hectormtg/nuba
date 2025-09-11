import type { APIRoute } from 'astro'
import { z } from 'astro:schema'
import { Resend } from 'resend'
import { SETTINGS } from '../../constants/settings.constants'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const prerender = false

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json()
  console.log('Email Body: ', body)
  const { name, email, subject, message } = body

  if (SETTINGS.EMAILS_DISABLED) {
    return new Response(
      JSON.stringify({
        message: 'Emails disabled',
      }),
      {
        status: 200,
        statusText: 'Emails disabled',
      }
    )
  }

  if (!name || !email || !subject || !message) {
    return new Response(null, {
      status: 404,
      statusText: 'Invalid payload',
    })
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

  if (data) {
    return new Response(
      JSON.stringify({
        message: data,
      }),
      {
        status: 200,
        statusText: 'Email sent',
      }
    )
  } else {
    return new Response(
      JSON.stringify({
        message: error,
      }),
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    )
  }
}
