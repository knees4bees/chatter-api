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
  beforeEach(async () => {
    await database.seed.run();
  });

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

// Get recent messages from a specific sender
describe('GET /api/v1/messages?recipient=:recipient_id&sender=:sender_id', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  const dbCall = async (sender_id, recipient_id) => {
	  const dbMessages = await database('messages')
      .where('sender_id', sender_id)
      .where('recipient_id', recipient_id)
      .whereBetween('created_at', [database.raw(`? - ?::INTERVAL`, [now, messageCutoff]), now])
      .orderBy('created_at', 'desc')
      .limit(messageLimit)
      .select();
    const expectedMessages = JSON.parse(JSON.stringify(dbMessages));

    return expectedMessages;
  }

	it('should return a 200 and recent messages from a specific sender', async () => {
    const sender_id = 2;
    const recipient_id = 1;
    const expectedMessages = await dbCall(sender_id, recipient_id);

	  const response = await request(app).get(`/api/v1/messages?recipient=${recipient_id}&sender=${sender_id}`);
	  const messages = response.body;

	  expect(response.status).toBe(200);
    expect(messages).toHaveLength(3);
	  expect(messages).toEqual(expectedMessages);
	});

	it('should get a maximum of 100 messages', async () => {
    const sender_id = 3;
    const recipient_id = 4;
    const expectedMessages = await dbCall(sender_id, recipient_id);

	  const response = await request(app).get(`/api/v1/messages?recipient=${recipient_id}&sender=${sender_id}`);
	  const messages = response.body;

	  expect(response.status).toBe(200);
    expect(messages).toHaveLength(100);
	  expect(messages).toEqual(expectedMessages);
	});

	it('should only get recent messages', async () => {
    const sender_id = 3;
    const recipient_id = 2;
    const expectedMessages = await dbCall(sender_id, recipient_id);

	  const response = await request(app).get(`/api/v1/messages?recipient=${recipient_id}&sender=${sender_id}`);
	  const messages = response.body;

	  expect(response.status).toBe(200);
    expect(messages).toHaveLength(2);
	  expect(messages).toEqual(expectedMessages);
	});

	it('should return a 404 and an error message when there are no messages', async () => {
    const sender_id = 1;
    const recipient_id = 4;

	  const response = await request(app).get(`/api/v1/messages?recipient=${recipient_id}&sender=${sender_id}`);

	  expect(response.status).toBe(404);
    expect(response.body.error).toEqual('Could not find requested messages');
	});
});

// Post a new message
describe('POST /api/v1/messages', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  const dbCall = async (sender_id, recipient_id) => {
	  const dbMessages = await database('messages')
      .where('sender_id', sender_id)
      .where('recipient_id', recipient_id)
      .whereBetween('created_at', [database.raw(`? - ?::INTERVAL`, [now, messageCutoff]), now])
      .orderBy('created_at', 'desc')
      .limit(messageLimit)
      .select();
    const expectedMessages = JSON.parse(JSON.stringify(dbMessages));

    return expectedMessages;
  }

	it('should post a new message to the database', async () => {
    const sender_id = 4;
    const recipient_id = 2;
    const newMessage = {
      "sender_id": sender_id,
      "recipient_id": recipient_id,
      "content": "helloooooo"
    }

    const messagesBeforePost = await dbCall(sender_id, recipient_id);

	  const response = await request(app).post('/api/v1/messages').send(newMessage);

    const messagesAfterPost = await dbCall(sender_id, recipient_id);
    const postedMessage = messagesAfterPost[0];

	  expect(response.status).toBe(201);
    expect(messagesBeforePost).toHaveLength(0);
    expect(messagesAfterPost).toHaveLength(1);
	  expect(newMessage.content).toBe(postedMessage.content);
	});
});

// Get all users
describe('GET /api/v1/users', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

	it('should return a 200 and all users', async () => {
    const dbUsers = await database('users').select();
    const expectedUsers = JSON.parse(JSON.stringify(dbUsers));

	  const response = await request(app).get('/api/v1/users');
	  const users = response.body;

	  expect(response.status).toBe(200);
    expect(users).toHaveLength(5);
	  expect(users).toEqual(expectedUsers);
	});
});
