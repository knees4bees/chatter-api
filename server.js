const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Chatter API';

app.get('/', (request, response) => {
  response.send('Welcome to the Chatter API!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});