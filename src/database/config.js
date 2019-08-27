const {
  DB_USER,
  DB_HOST,
} = process.env;

module.exports = {
  development: {
    // Only set the PSQL username property if it is defined as an env var
    ...DB_USER && { username: DB_USER },
    database: '82-games-api-dev',
    host: DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
};
