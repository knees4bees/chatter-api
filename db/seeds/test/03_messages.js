const messagesData = require('../../../messagesData');

exports.seed = async (knex) => {
  try {
    const messagePromises = messagesData.map(message => {
      return knex('messages').insert(message);
    });

    return Promise.all(messagePromises);
  } catch (error) {
    console.log(`Error seeding messages: ${error}`);
  }
};
