# Facebook Clone Backend

A TypeScript-based backend for a Facebook clone application.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory (see `.env.example` for required variables)

## Development

- Start development server with hot reload:
  ```bash
  npm run dev
  ```

- Build the project:
  ```bash
  npm run build
  ```

- Start production server:
  ```bash
  npm start
  ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── index.ts          # Application entry point
├── config/           # Configuration files
├── controllers/      # Route controllers
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## License

ISC 