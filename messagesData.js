const faker = require('faker');

faker.seed(1729)

const fakeMessages = [];

const createFakeMessage = (hasOldDate) => ({
  sender_id: 1,
  recipient_id: 2,
  content: faker.hacker.phrase(),
  created_at: hasOldDate ? faker.date.past() : faker.date.recent(),
});

for (let i = 0; i < 120; i++) {
  fakeMessages.push(createFakeMessage(true));
}


const messagesData = [{
  id: 1,
  sender_id: 1,
  recipient_id: 2,
  content: 'Hey hey!',
  created_at: "2021-03-11T02:26:00.219Z"
},
{
  id: 2,
  sender_id: 2,
  recipient_id: 1,
  content: 'Hey what\'s up?',
  created_at: "2021-03-11T02:26:00.219Z"
},
{
  id: 3,
  sender_id: 1,
  recipient_id: 2,
  content: 'Not much. You?'
},
{
  id: 4,
  sender_id: 2,
  recipient_id: 1,
  content: 'Oh not much'
},
{
  id: 5,
  sender_id: 1,
  recipient_id: 2,
  content: 'This is an exciting conversation'
},
{
  id: 6,
  sender_id: 2,
  recipient_id: 1,
  content: 'Yeah for sure'
},
{
  id: 7,
  sender_id: 2,
  recipient_id: 1,
  content: 'Hey I saw something cool the other day'
},
{
  id: 8,
  sender_id: 2,
  recipient_id: 3,
  content: 'Hey',
  created_at: "2021-04-18T02:26:00.219Z"
},
{
  id: 9,
  sender_id: 3,
  recipient_id: 2,
  content: 'hey how\'s it going',
  created_at: "2021-04-19T02:26:00.219Z"
},
{
  id: 10,
  sender_id: 2,
  recipient_id: 3,
  content: 'Good! Guess what'
},
{
  id: 11,
  sender_id: 3,
  recipient_id: 2,
  content: 'what'
},
{
  id: 12,
  sender_id: 2,
  recipient_id: 3,
  content: 'I have a pet squirrel now'
},
{
  id: 13,
  sender_id: 3,
  recipient_id: 2,
  content: 'no way'
},
{
  id: 14,
  sender_id: 2,
  recipient_id: 3,
  content: 'No for real'
},
{
  id: 15,
  sender_id: 2,
  recipient_id: 3,
  content: 'It\'s really cute. Fluffy tail and everything'
},
...fakeMessages
];

module.exports = messagesData;