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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#testing">Testing</a></li>
      </ul>
    </li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#project-design-and-process">Project Design and Process</a>
      <ul>
        <li><a href="#project-management">Project Management</a></li>
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

The API documentation exists as a separate [file in this repo](API_documentation.md).

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

### Prerequisites
To run the Chatter API you'll need to have Node.js and PostgreSQL installed:
* https://www.postgresql.org/download
* https://nodejs.org/en/download
### Installation

1. Clone this repo:
   ```sh
   $ git clone git@github.com:knees4bees/chatter-api.git
   ```
2. Move into the chatter-api directory:
   ```sh
   $ cd chatter-api
   ```
3. Install dependencies:
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
$ npx knex migrate:latest
$ npx knex migrate:latest --env=test
```
3. Seed databases:
```sh
$ npx knex seed:run
$ npx knex seed:run --env=test
```
4. Start server:
```sh
$ npm start
```
5. In a browser, nagivate to <http://localhost:3000>.

### Testing
```sh
$ npm test
```
Note that an error message appears that I wasn't able to easily resolve. It doesn't affect the outcome of the tests.
```
A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks.
```
I filed an [issue](https://github.com/knees4bees/chatter-api/issues/25) for this.

---
## Endpoints
For more details, please see the separate [API documentation](API_documentation.md).

| Name | Method | Description |
| ---- | ------ | ----------- |
| `/api/v1/messages?recipient=:recipient_id&sender=:sender_id` | GET | Get up to 100 recent messages for a particular recipient (required), optionally from a particular sender |
| `/api/v1/messages` | POST | Send a new message from a sender to a recipient |
| `/api/v1/users` | GET | Get all users |

All output is in JSON format.

Wrongly formatted or invalid requests yield an error (i.e., a 404, 422, or 500 status code, along with an accompanying error message).

---
## Project Design and Process

### Project Management
I organized my work using a [GitHub Projects board with automated kanban](https://github.com/knees4bees/chatter-api/projects/1).

### Wireframes
I started this project by sketching a few wireframes for a possible frontend, partly because that helped me get comfortable but mostly so I could imagine how and where the API's data might eventually be used and let that guide me in my decisions as I planned the structure of the endpoints and the database schema.

The sidebar on the left holds a list of all users (possibly/probably only those users who are the current user's friends/contacts) with a specific person selected. The box on the right shows the recent messages between that selected person and the current user, with the most recent messages at the bottom. The form below that is for input of a new message, with an adjacent button to submit the message.
![image](https://user-images.githubusercontent.com/72777671/123360928-21fe4c80-d53c-11eb-8526-82759f7159d3.png)


The sidebar is the same as before but this time with the "most recent" contacts option selected. Each row in the box on the right corresponds to a contact/friend and shows the most recent message between that person and the current user.
![image](https://user-images.githubusercontent.com/72777671/123360992-40fcde80-d53c-11eb-88e7-46049fdec5af.png)
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
There are several avenues for future improvement:
- Refactor database calls in `app.js` for messages endpoint. Right now the two flavors differ only in whether they include the line `.where('sender_id', sender_id)`.
- Consider organizing the messages endpoint differently so that it's possible to retrieve recent messages from an entire two-sided conversation rather than the way it's set up now, where you get recent messages from each side of the conversation individually. This wasn't possible given the original project specification, but it would be more desirable from a frontend perspective.
- In the test file, figure out how to make a fixed date for `now` to ensure predictable results. (The way it's set up now isn't likely to be a problem, but the tests would be more robust with all dates being controlled.)
- Consider moving the declaration of the variable `now` out of the global scope in `app.js`. It's okay at the moment, but in a production app we'd need to consider the possibility of a user leaving the app open for a while and the meaning of `now` becoming gradually less accurate.
- Consider making the testing more robust by checking that the oldest record returned has a date within 30 days. (Right now the tests check that the correct number of records are returned but don't check the date explicitly.)
- Figure out how to add tests for a wide range of 500 errors.
- Add an option to seed the database without users to test a 404 response on the users endpoint.
- Add a limit on the size of the content in POST requests for a new message. (The project specification calls for the ability to send "short text messages" but right now there's no explicit limit set on the size of the message content.)
- Add a way to fetch only those users who are friends with or otherwise connected to the current user.
- See the [open issues](https://github.com/knees4bees/chatter-api/issues) for a bug list.

---
## Contact
[<img src="https://img.shields.io/badge/LinkedIn-Katie%20B-informational?style=for-the-badge&labelColor=black&logo=linkedin&logoColor=0077b5&&color=0077b5"/>](https://www.linkedin.com/in/katie-b-dev)
[<img src="https://img.shields.io/badge/Github-Katie%20B-informational?style=for-the-badge&labelColor=black&logo=github&color=8B0BD5"/>]( https://github.com/knees4bees)