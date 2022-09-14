const { default: createStrapi } = require("strapi")

module.exports = {
  send: async ctx => {
        const body = ctx.request.body
        strapi.log.debug(body)
        strapi.log.debug(`Trying to send an email`)
    
        try {
          const emailOptions = {
            to: "hassan@dynamiclogix.com",
            subject: 'This is a test',
            html: `<h1>Welcome!</h1><p>This is a test HTML email.</p>`,
          }
          await strapi.plugins['email'].services.email.send(emailOptions)
          ctx.send({ message: 'Email sent' })
        } catch (err) {
          ctx.send({ error: 'Error sending email' })
        }
      },
}