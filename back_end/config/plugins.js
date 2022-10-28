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
            apiKey: "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",
          },
          settings: {
            defaultFrom: 'bc190201464@vu.edu.pk',
            defaultReplyTo: 'bc190201464@vu.edu.pk'
          },
        },
      },
  });
