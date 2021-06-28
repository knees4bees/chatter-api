# Chatter API

## Get messages
| Name | Method | Description |
| ---- | ------ | ----------- |
| `/api/v1/messages` | GET | Get up to 100 messages sent within the past 30 days. Yields an error if the recipient is missing or invalid, or if the (optional) sender is invalid. |

### Parameters
| Name | Data Type | Required/Optional | Description |
| ---- | --------- | ----------------- | ----------- |
| recipient | integer | required | Specifies the recipient of the messages being requested (should be the id of the current user). |
| sender | integer | optional | Specifies the sender of the messages being requested. If no sender is specified then messages are returned for all senders. |

### Examples and Sample Response
//TODO fill this in

---
## Send a message
| Name | Method | Description |
| ---- | ------ | ----------- |
| `/api/v1/messages` | POST | Send a new message from a sender to a recipient. Will yield an error if a `sender_id` (integer), a `recipient_id` (integer), and `content` (string) are not included in the request body. |

### Example and Sample Response
//TODO fill this in

---

## Get all users
| Name | Method | Description |
| ---- | ------ | ----------- |
| `/api/v1/users` | GET | Get all users. |

### Example and Sample Response
//TODO fill this in
