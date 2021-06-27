const faker = require('faker');

faker.seed(1729)

const createFakeMessage = (sender_id, recipient_id, hasOldDate) => ({
  sender_id,
  recipient_id,
  content: faker.hacker.phrase(),
  created_at: hasOldDate ? faker.date.past() : faker.date.recent(),
});

const createFakeMessages = (sender_id, recipient_id, hasOldDate, quantity) => {
  const fakeMessages = [];

  for (let i = 0; i < quantity; i++) {
    fakeMessages.push(createFakeMessage(sender_id, recipient_id, hasOldDate));
  }

  return fakeMessages;
}

const messagesData = [{
  sender_id: 1,
  recipient_id: 2,
  content: 'Hey hey!',
  created_at: "2021-03-11T02:26:00.219Z"
},
{
  sender_id: 2,
  recipient_id: 1,
  content: 'Hey what\'s up?',
  created_at: "2021-03-11T02:26:00.219Z"
},
{
  sender_id: 1,
  recipient_id: 2,
  content: 'Not much. You?'
},
{
  sender_id: 2,
  recipient_id: 1,
  content: 'Oh not much'
},
{
  sender_id: 1,
  recipient_id: 2,
  content: 'This is an exciting conversation'
},
{
  sender_id: 2,
  recipient_id: 1,
  content: 'Yeah for sure'
},
{
  sender_id: 2,
  recipient_id: 1,
  content: 'Hey I saw something cool the other day'
},
{
  sender_id: 2,
  recipient_id: 3,
  content: 'Hey',
  created_at: "2021-04-18T02:26:00.219Z"
},
{
  sender_id: 3,
  recipient_id: 2,
  content: 'hey how\'s it going',
  created_at: "2021-04-19T02:26:00.219Z"
},
{
  sender_id: 2,
  recipient_id: 3,
  content: 'Good! Guess what'
},
{
  sender_id: 3,
  recipient_id: 2,
  content: 'what'
},
{
  sender_id: 2,
  recipient_id: 3,
  content: 'I have a pet squirrel now'
},
{
  sender_id: 3,
  recipient_id: 2,
  content: 'no way'
},
{
  sender_id: 2,
  recipient_id: 3,
  content: 'No for real'
},
{
  sender_id: 2,
  recipient_id: 3,
  content: 'It\'s really cute. Fluffy tail and everything'
},
...createFakeMessages(3, 4, true, 20),
...createFakeMessages(4, 3, true, 80),
...createFakeMessages(3, 4, false, 120),
...createFakeMessages(4, 3, false, 40),
];

module.exports = messagesData;