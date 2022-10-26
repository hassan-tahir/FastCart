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
            apiKey: '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',
          },
          settings: {
            defaultFrom: 'bc190201464@vu.edu.pk',
            defaultReplyTo: 'bc190201464@vu.edu.pk'
          },
        },
      },
  });
