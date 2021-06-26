const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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
  let messages;

  try {
    if (request.query.sender) {
      messages = await database('messages').where('sender_id', request.query.sender).select();
    } else {
      messages = await database('messages').select();
    }

    if (messages.length) {
      response.status(200).json(messages);
    } else {
      response.status(404).json({ error: 'Could not find requested messages' });
    }
  } catch (error) {
    response.sendStatus(500).json({ error: 'Internal server error' });
  }
});