const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const now = database.fn.now();
const messageCutoff = '30 day';
const messageLimit = 100;

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Chatter API';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/', (request, response) => {
  response.send('Welcome to the Chatter API!');
});

app.get('/api/v1/messages', async (request, response) => {
  const sender_id = request.query.sender;
  const recipient_id = request.query.recipient;
  let messages;

  try {
    if (!recipient_id) {
      response.status(422).json({ error: 'A recipient parameter is required' });
    }

    if (sender_id) {
      messages = await database('messages')
        .where('sender_id', sender_id)
        .where('recipient_id', recipient_id)
        .whereBetween('created_at', [database.raw(`? - ?::INTERVAL`, [now, messageCutoff]), now])
        .orderBy('created_at', 'desc')
        .limit(messageLimit)
        .select();
    } else {
      messages = await database('messages')
        .where('recipient_id', recipient_id)
        .whereBetween('created_at', [database.raw(`? - ?::INTERVAL`, [now, messageCutoff]), now])
        .orderBy('created_at', 'desc')
        .limit(messageLimit)
        .select();
    }

    if (messages.length) {
      response.status(200).json(messages);
    } else {
      response.status(404).json({ error: 'Could not find requested messages' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.post('/api/v1/messages', async (request, response) => {
  const message = request.body;

  for (let requiredParameter of ['sender_id', 'recipient_id', 'content']) {
    if (!message[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { sender_id: <integer>, recipient_id: <integer>, content: <text> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  try {
    const id = await database('messages').insert(message, 'id');
    response.status(201).json({ id })
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/users', async (request, response) => {
  try {
    const users = await database('users').select();

    if (users.length) {
      response.status(200).json(users);
    } else {
      response.status(404).json({ error: 'Could not find any users' });
    }
  } catch(error) {
    response.status(500).json({ error });
  }
});