const messagesData = require('../../../messagesData');

exports.seed = async (knex) => {
  try {
    const messagePromises = messagesData.map(message => {
      return knex('messages').insert(message);
    });

    await knex.raw('SELECT setval(\'messages_id_seq\', MAX(id)) from messages');

    return Promise.all(messagePromises);
  } catch (error) {
    console.log(`Error seeding messages: ${error}`);
  }
};
