# Chatter API

## Base URL
`http://localhost:3000`

---

## Get messages
| Name | Method | Description |
| ---- | ------ | ----------- |
| `/api/v1/messages` | GET | Gets up to 100 messages from within the past 30 days. Yields an error if the recipient is missing or invalid, or if the (optional) sender is invalid. |

### Parameters
| Name | Data Type | Required/Optional | Description |
| ---- | --------- | ----------------- | ----------- |
| recipient | integer | required | Specifies the recipient of the messages being requested (should be the id of the current user). |
| sender | integer | optional | Specifies the sender of the messages being requested. If no sender is specified then messages are returned for all senders. |

### Sample Requests and Responses
#### Get up to 100 recent messages to a specific recipient
`http://localhost:3000/api/v1/messages?recipient=2`
```
[
  {
    "id": 14,
    "sender_id": 3,
    "recipient_id": 2,
    "content": "no way",
    "created_at": "2021-06-27T02:11:52.659Z",
    "updated_at": "2021-06-27T02:11:52.659Z"
  },
  {
    "id": 11,
    "sender_id": 3,
    "recipient_id": 2,
    "content": "what",
    "created_at": "2021-06-27T02:11:52.658Z",
    "updated_at": "2021-06-27T02:11:52.658Z"
  },
  {
    "id": 5,
    "sender_id": 1,
    "recipient_id": 2,
    "content": "This is an exciting conversation",
    "created_at": "2021-06-27T02:11:52.653Z",
    "updated_at": "2021-06-27T02:11:52.653Z"
  },
  {
    "id": 3,
    "sender_id": 1,
    "recipient_id": 2,
    "content": "Not much. You?",
    "created_at": "2021-06-27T02:11:52.651Z",
    "updated_at": "2021-06-27T02:11:52.651Z"
  }
]
```

#### Get up to 100 recent messages to a specific recipient from a specific sender
`http://localhost:3000/api/v1/messages?recipient=2&sender=1`
```
[
  {
    "id": 5,
    "sender_id": 1,
    "recipient_id": 2,
    "content": "This is an exciting conversation",
    "created_at": "2021-06-27T02:11:52.653Z",
    "updated_at": "2021-06-27T02:11:52.653Z"
  },
  {
    "id": 3,
    "sender_id": 1,
    "recipient_id": 2,
    "content": "Not much. You?",
    "created_at": "2021-06-27T02:11:52.651Z",
    "updated_at": "2021-06-27T02:11:52.651Z"
  }
]
```

---
## Send a message
| Name | Method | Description |
| ---- | ------ | ----------- |
| `/api/v1/messages` | POST | Sends a new message from a sender to a recipient. Returns the id of the newly created message. Will yield an error if a `sender_id` (integer), a `recipient_id` (integer), and `content` (string) are not all included in the request body. |

### Sample Request and Response
`http://localhost:3000/api/v1/messages`

Request body:
```
{
  "sender_id": 4,
  "recipient_id": 2,
  "content": "helloooooo"
}
```
Response:
```
{
  "id": [
    278
  ]
}
```

---

## Get all users
| Name | Method | Description |
| ---- | ------ | ----------- |
| `/api/v1/users` | GET | Gets all users. |

### Sample Request and Response
`http://localhost:3000/api/v1/users`

```
[
  {
    "id": 1,
    "first_name": "Ali",
    "last_name": "Foo",
    "created_at": "2021-06-27T02:11:52.638Z",
    "updated_at": "2021-06-27T02:11:52.638Z"
  },
  {
    "id": 2,
    "first_name": "Bob",
    "last_name": "Bar",
    "created_at": "2021-06-27T02:11:52.638Z",
    "updated_at": "2021-06-27T02:11:52.638Z"
  },
  {
    "id": 3,
    "first_name": "Chris",
    "last_name": "Cat",
    "created_at": "2021-06-27T02:11:52.638Z",
    "updated_at": "2021-06-27T02:11:52.638Z"
  },
  {
    "id": 4,
    "first_name": "Dan",
    "last_name": "Dog",
    "created_at": "2021-06-27T02:11:52.638Z",
    "updated_at": "2021-06-27T02:11:52.638Z"
  },
  {
    "id": 5,
    "first_name": "Elena",
    "last_name": "Foo",
    "created_at": "2021-06-27T02:11:52.638Z",
    "updated_at": "2021-06-27T02:11:52.638Z"
  }
]
```