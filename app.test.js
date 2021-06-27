import request from 'supertest';
import app from './app';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const now = database.fn.now();
const messageCutoff = '30 day';
const messageLimit = 100;

describe('Server', () => {
  it('should return a 200 status', async () => {
    const response = await request(app).get('/');
    expect (response.status).toBe(200);
  });
});

// Get recent messages from all senders
describe('GET /api/v1/messages?recipient=:recipient_id', () => {
  const dbCall = async (recipient_id) => {
	  const dbMessages = await database('messages')
      .where('recipient_id', recipient_id)
      .whereBetween('created_at', [database.raw(`? - ?::INTERVAL`, [now, messageCutoff]), now])
      .orderBy('created_at', 'desc')
      .limit(messageLimit)
      .select();
    const expectedMessages = JSON.parse(JSON.stringify(dbMessages));

    return expectedMessages;
  }

	it('should return a 200 and recent messages from all senders', async () => {
    const recipient_id = 3;
    const expectedMessages = await dbCall(recipient_id);

	  const response = await request(app).get(`/api/v1/messages?recipient=${recipient_id}`);
	  const messages = response.body;

	  expect(response.status).toBe(200);
    expect(messages).toHaveLength(50);
	  expect(messages).toEqual(expectedMessages);
	});

	it('should get a maximum of 100 messages', async () => {
    const recipient_id = 4;
    const expectedMessages = await dbCall(recipient_id);

	  const response = await request(app).get(`/api/v1/messages?recipient=${recipient_id}`);
	  const messages = response.body;

	  expect(response.status).toBe(200);
    expect(messages).toHaveLength(100);
	  expect(messages).toEqual(expectedMessages);
	});

	it('should only get recent messages', async () => {
    const recipient_id = 2;
    const expectedMessages = await dbCall(recipient_id);

	  const response = await request(app).get(`/api/v1/messages?recipient=${recipient_id}`);
	  const messages = response.body;

	  expect(response.status).toBe(200);
    expect(messages).toHaveLength(4);
	  expect(messages).toEqual(expectedMessages);
	});

	it('should return a 404 and an error message when there are no messages', async () => {
    const recipient_id = 5;

	  const response = await request(app).get(`/api/v1/messages?recipient=${recipient_id}`);

	  expect(response.status).toBe(404);
    expect(response.body.error).toEqual('Could not find requested messages');
	});

	it('should return a 422 and an error message when no recipient is specified', async () => {
	  const response = await request(app).get('/api/v1/messages');

	  expect(response.status).toBe(422);
    expect(response.body.error).toEqual('A recipient parameter is required');
	});
});