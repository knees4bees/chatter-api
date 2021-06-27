
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/chatter',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/chatter_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  }
};
