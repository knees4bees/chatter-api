import request from 'supertest';
import app from './app';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const now = database.fn.now();
const messageCutoff = '30 day';
const messageLimit = 100;

describe('GET /api/v1/messages?recipient=3', () => {
	it('should return a 200 and recent messages from all senders', async () => {

	  const dbMessages = await database('messages')
      .where('recipient_id', 3)
      .whereBetween('created_at', [database.raw(`? - ?::INTERVAL`, [now, messageCutoff]), now])
      .orderBy('created_at', 'desc')
      .limit(messageLimit)
      .select();
    
    const expectedMessages = JSON.parse(JSON.stringify(dbMessages));

	  const response = await request(app).get('/api/v1/messages?recipient=3');
	  const messages = response.body;
      
	  expect(response.status).toBe(200);
	  expect(messages).toEqual(expectedMessages);
    expect(messages).toHaveLength(50);
	});
});