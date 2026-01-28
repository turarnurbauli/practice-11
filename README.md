# Practice Task 11 – Node.js + Express + MongoDB API

This is a simple backend API used for Practice Task 11 (deployment and Git).

## Tech stack

- Node.js
- Express
- MongoDB + Mongoose

## Environment variables

Create a `.env` file in the project root (do **not** commit it to Git):

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string_here
```

Both variables are required in production. `PORT` is provided by the hosting platform.

## Scripts

```bash
npm start
```

## API Endpoints

- `GET /` – health check
- `GET /api/items` – list all items
- `GET /api/items/:id` – get one item
- `POST /api/items` – create item
- `PUT /api/items/:id` – update item
- `DELETE /api/items/:id` – delete item

All responses are JSON.

