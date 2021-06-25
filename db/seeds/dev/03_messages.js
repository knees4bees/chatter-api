exports.seed = async (knex) => {
  try {
    await knex('messages').insert([{
      id: 1,
      sender_id: 1,
      recipient_id: 2,
      content: 'Hey hey!'
    },
    {
      id: 2,
      sender_id: 2,
      recipient_id: 1,
      content: 'Hey what\'s up?'
    },
    {
      id: 3,
      sender_id: 1,
      recipient_id: 2,
      content: 'Not much. You?'
    }])
  } catch (error) {
    console.log(`Error seeding messages: ${error}`);
  }
};
