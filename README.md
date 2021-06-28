# Welcome to the Chatter API!

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#Overview">Overview</a>
      <ul>
        <li><a href="#description">Description</a></li>
        <li><a href="#background">Background</a></li>
      </ul>
      <ul>
	<li><a href="#technologies-used">Technologies Used</a></li>
      </ul>
      <ul>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisite">Prerequisite</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#testing">Testing</a></li>
      </ul>
    </li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#project-design-and-process">Project Design and Process</a>
      <ul>
        <li><a href="#wireframes">Wireframes</a></li>
        <li><a href="#database-schema">Database Schema</a></li>
      </ul>
    </li>
    <li><a href="#ideas-and-issues">Ideas and Issues</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Overview
The Chatter API is a simple messaging API to support a hypothetical web app in which two users can send text messages to each other.

### Description
Chatter has a few basic functions:
- One user can send a text message to another user
- Recent messages can be requested for a given user from all senders
- Recent messages can be requested for a given user from a specific sender
- A list of all users can be requested

Only recent messages (within the past 30 days) are returned, with a limit of 100 messages.

### Background
(Or lack thereof... 🙂) I recently graduated from the _frontend_ engineering program at [Turing School](https://turing.edu), and this is my first backend project! I wouldn't be surprised if I've missed something obvious, given weird names to things, used unusual patterns, etc. Feedback of any kind is more than welcome! I'm here to learn.

### Technologies Used
The Chatter API was built using an Express server, a Postgres database, and the Knex.js query builder. Testing was conducted with Jest and SuperTest.

 ![Express](https://img.shields.io/badge/express-000000.svg?&style=for-the-badge&logo=express&logoColor=white)
 ![Node.js](https://img.shields.io/badge/node-339933.svg?&style=for-the-badge&logo=node.js&logoColor=white)
 ![JavaScript](https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black)
 ![Knex](https://img.shields.io/badge/knex.js-E26326.svg?&style=for-the-badge&logo=knex&logoColor=white)
 ![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1.svg?&style=for-the-badge&logo=postgresql&logoColor=white)
 ![Jest](https://img.shields.io/badge/jest-C21325.svg?&style=for-the-badge&logo=jest&logoColor=white)

---
## Getting Started
Follow these steps to get the Chatter API up and running on your local machine.

### Prerequisite
To run the Chatter API you'll need to have PostgreSQL installed: https://www.postgresql.org/download

### Installation

1. Clone this repo:
   ```sh
   $ git clone git@github.com:knees4bees/chatter-api.git
   ```
2. Install dependencies:
   ```sh
   $ npm install
   ```

### Usage
1. Create development and testing databases:
```sh
$ psql
# CREATE DATABASE chatter;
# CREATE DATABASE chatter_test;
\q
```
2. Run migrations:
```sh
$ knex migrate:latest
$ knex migrate:latest --env=test
```
3. Seed databases:
```sh
$ knex seed:run
$ knex seed:run --env=test
```
4. Start server:
```sh
$ npm start
```
5. In a browser, nagivate to `http://localhost:3000/`

### Testing
```sh
$ npm test
```

---
## Endpoints

For more details please see the separate [API Documentation](API_documentation.md).

| Name | Method | Description |
| ---------- | ------ | -------- |
| `/api/v1/messages?recipient=:recipient_id&sender=:sender_id` | GET | Get all recent messages for a particular recipient (required), optionally from a particular sender |
| `/api/v1/messages` | POST | Send a new message from a sender to a recipient |
| `/api/v1/users` | GET | Get all users |

All output is in JSON format.

Wrongly formatted or invalid requests yield an error (i.e., a 404, 422, or 500 status code, along with an accompanying error message).
---
## Project Design and Process

### Wireframes
### Database Schema
The PostgreSQL database for Chatter has two tables, **users** and **messages**.

|  users  |            |           |
| ------| ------| ------|
| `id` | integer | primary key |
| `first_name` | varchar (255) |       |
| `last_name` | varchar (255) |       |
| `created_at` | timestamp with time zone | default to `CURRENT_TIMESTAMP` |
| `updated_at` | timestamp with time zone | default to `CURRENT_TIMESTAMP` |


| messages |       |       |
| ------| ---------| ------|
| `id` | integer | primary key |
| `sender_id` | integer | foreign key pointing to `users` |
| `recipient_id` | integer | foreign key pointing to `users` |
| `content` | text |  |
| `created_at` | timestamp with time zone | default to `CURRENT_TIMESTAMP` |
| `updated_at` | timestamp with time zone | default to `CURRENT_TIMESTAMP` |

---
## Ideas and Issues

See the [open issues](https://github.com/knees4bees/chatter-api/issues) for a bug list.

---
## Contact
[<img src="https://img.shields.io/badge/LinkedIn-Katie%20B-informational?style=for-the-badge&labelColor=black&logo=linkedin&logoColor=0077b5&&color=0077b5"/>](https://www.linkedin.com/in/katie-b-dev)
[<img src="https://img.shields.io/badge/Github-Katie%20B-informational?style=for-the-badge&labelColor=black&logo=github&color=8B0BD5"/>]( https://github.com/knees4bees )