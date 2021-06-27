
exports.seed = async (knex) => {
  try {
    await knex('messages').del()
    await knex('users').del()
  } catch (error) {
    console.log(`Error resetting seed data: ${error}`);
  }
};
