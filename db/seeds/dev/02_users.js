
exports.seed = async (knex) => {
  try {
    await knex('users').insert([{
      id: 1,
      first_name: 'Ali',
      last_name: 'Foo'
    },
    {
      id: 2,
      first_name: 'Bob',
      last_name: 'Bar'
    },
    {
      id: 3,
      first_name: 'Chris',
      last_name: 'Cat'
    },
    {
      id: 4,
      first_name: 'Dan',
      last_name: 'Dog'
    },
    {
      id: 5,
      first_name: 'Elena',
      last_name: 'Foo'
    }])

    await knex.raw('SELECT setval(\'users_id_seq\', MAX(id)) from users');
  } catch (error) {
    console.log(`Error seeding users: ${error}`);
  }
};
