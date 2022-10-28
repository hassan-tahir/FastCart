module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'fastcartdbinstance.cfmb4eevqitx.ap-northeast-1.rds.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'postgres'),
      user: env('DATABASE_USERNAME', 'fastcart'),
      password: env('DATABASE_PASSWORD', '12345678'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      
    },
    debug: false,
  },
});