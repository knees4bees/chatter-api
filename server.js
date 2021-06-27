import app from './app';

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Chatter API';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
