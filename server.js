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
  try {
    const messages = await database('messages').select();
    response.status(200).json(messages);
  } catch (error) {
    response.status(500).json({ error });
  }
});