# Backend Setup

This backend is a simple Node.js/Express API for the Amazon clone app.

## Install

```bash
cd backend
npm install
```

## Environment

Create a `backend/.env` file with these values:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sneha
DB_NAME=amazon_clone
```

If you are using an Aiven or remote MySQL instance, replace these values with the correct host, port, user, password, and database.

## Database schema

If your database does not already contain the expected tables, run the SQL in `backend/schema.sql`.

## Start the backend

```bash
cd backend
npm start
```

The server listens on `http://localhost:5000`.

## Notes

- The app will return a `500` error for `/products`, `/cart`, and other endpoints if the required tables are missing.
- `backend/.gitignore` is already configured to ignore the `.env` file.
