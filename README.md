# Test Project

Starter scaffold for a small chat backend/frontend demo. Use this as a coding exercise platform

## Repository Layout

- `api/` – Express backend (messages, file uploads)
- `app/` – React frontend scaffold

## Prerequisites

- Node.js 22+
- pnpm (recommended) or npm

## Quick Start

```bash
# backend
cd api
cp env.example .env     # set Pusher credentials (optional)
pnpm install
pnpm dev                # starts on http://localhost:3001

# frontend
cd ../app
cp env.example .env     # set Pusher credentials (optional)
pnpm install
pnpm dev                # starts on http://localhost:3000
```

**Note:** No database setup required! The app uses in-memory storage for messages. Messages will be lost on server restart, but file uploads persist.

## Simple Challenges

1. **Real-time messages with Pusher (backend + frontend)**

   - Wire up Pusher on the backend to publish `new-message` and `message-deleted` events when messages are created/deleted.
   - On the frontend, initialize Pusher and subscribe to the same channel/events to live-update the message list (append on new-message, remove on message-deleted).
   - Add `.env` entries for Pusher keys (backend + frontend) and document how to run with them.

2. **Message search endpoint + realtime filter (backend + frontend)**
   - Add `GET /api/messages/search?q=term` (case-insensitive, newest first, non-empty `q`, max 100 results).
   - Add a search input in the UI that hits this endpoint with a 300ms debounce and shows loading/empty states.
   - When not searching, keep showing the live Pusher-powered feed from Challenge 1; when searching, show filtered results without breaking realtime updates once the search is cleared.

## Submission Guidelines

After completing your challenges:

1. **Update README**: Document which challenges you completed and any additional setup required
2. **Submit Your Work**:
   - Add this repository to your GitHub account
   - Send an email to the hugo@findock.xyz with the repository link
   - We will review your submission and get back to you

**Important Notes:**

- **Quality over quantity**: It's better to complete fewer challenges well than many challenges poorly. Focus on demonstrating your understanding of the stack and best practices.
- **No AI Tools**: Please do not use AI tools like ChatGPT or Copilot for this assessment. We want to evaluate your own coding abilities and problem-solving skills.

**Challenge Completed:**

- **1. Real-time messages with Pusher (backend + frontend):** Implemented realtime message with pusher using pusher and pusher-js

  - Created Sandbox channel in pusher.com.
  - Copy API Keys to .env file as required
  - Created an library class _PusherService_ in `pusher.js` and exported its single instance.
  - All message is pushed to single channel `mesage-channel`
  - _PusherService_ has two functions.
    - _createMessage_ It pushes the `createMessage` trigger in `message-channel` with messageObject as a payload.
    - _deleteMessage_ It pushes the `deleteMessage` trigger in `message-channel` with messageId as a payload.
  - Implemeted _createMessage_ function in
    - Create message route: POST('/')
    - Create message with image route: POST('/with-image')
      **pusherService.createMessage(newMessage);**
  - Implemeted _deleteMessage_ function in
    - Delete message route: DELETE('/:id')
      **pusherService.deleteMessage(deletedMessage.id);**
  - In Frontend
  - _useEffect()_ hook is used to manage the lifecycle to pusher
    - The pusher connection is created once the component is mount
    - All listner and subscription are close once component unmounts
  - Backend emits the event after
    - _create-message_ when new message is added
    - _delete-message_ when message is deleted
  - Frotend upadtes its local state by:
    - When create-messasge event is received, add new message if not exists, check by unique id
    - Remove message when delete-message event is received, check by id

- **2. Message search endpoint + realtime filter (backend + frontend)**

  - Added route `api/messages/search?q=term`
  - Use `search` method of Message model.

  - Added Input field to search the message
  - Debounce using `setTimeOut` of 300ms, to query the messages using the api route above.
  - When searching, only show the message matching the search query message.
  - If new messages triggers that matches the search query, it also get displayed. But new message that doesn't match the search query is ignored.
  - If delete message triggers and that message is in searched messages matching the searchQuery, it also get removed from the messages list.
  - Not searching, live feed of message is active for all messages.

  **Enviroment Variable**

  - if pusher api key is not set in enviroment variable
    - it doesn't affect the messaging.
    - show info of real time message not avaibale in the frontend.
    - backend wont crashes but is disabled, console with warning message saying pusher is disabled and enviroment variable is missing.
