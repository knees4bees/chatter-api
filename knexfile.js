
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/chatter',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  }
};
