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
          provider: 'sendgrid',
          providerOptions: {
            apiKey: "SENDGRID KEY",
          },
          settings: {
            defaultFrom: 'bc190201464@vu.edu.pk',
            defaultReplyTo: 'bc190201464@vu.edu.pk'
          },
        },
      },
  });
