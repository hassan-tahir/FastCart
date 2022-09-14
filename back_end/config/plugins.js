module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    email: {
        config: {
          provider: 'sendmail',
          // providerOptions: {
          //   apiKey: env('SENDGRID_API_KEY'),
          // },
          settings: {
            defaultFrom: 'noreply@project.com',
            defaultReplyTo: 'hassanch0089@gmail.com'
          },
        },
      },
  });