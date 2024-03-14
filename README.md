
# Snake Game

This is a classic Snake game implemented using Node.js with TypeScript for the backend and React 18 with TypeScript for the frontend.

## How to Run

To run the application, use the following command:

```
bun server/run.ts
```

This will start the server on port 8001. Open your browser and navigate to `http://localhost:8001` to play the game.

## Backend

The backend is built using Node.js with TypeScript and uses SQLite (sqlite3 library) for the database. The server creates all necessary database tables and handles all database operations.

## Frontend

The frontend is built using React 18 with TypeScript. The entry point for the frontend is `client/index.tsx`, and the CSS file is `client/index.css`.

## Shared Types

The request and response types (DTO) are described in a shared folder called `shared` to ensure type consistency between the backend and frontend.

## Libraries Used

The following libraries are used in this project:

- express
- socket.io
- sqlite3
- react
- react-dom
- tailwindcss

The exact versions of these libraries can be found in the `package.json` file.

## Endpoints

The server and client are on the same port, and the root path (`/`) is used for endpoints.

## Additional Notes

- The React root is attached to `<div id="root"></div>`.
- The server is already running on port 8001 with Express and Socket.IO (in case it's needed).
- The application is ready to run with all the required functionality implemented.

