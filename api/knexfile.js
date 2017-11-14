require('dotenv').config();

/**
 * Database configuration
 */
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    filename: __dirname + '/' + process.env.DB_FILE
  },
  migrations: {
    tableName: 'migrations'
  },
  useNullAsDefault: true
}
