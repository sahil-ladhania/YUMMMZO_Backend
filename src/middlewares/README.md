# Middlewares

This folder contains custom middleware functions for request handling.

## Files:
- **authMiddleware.js**: Ensures the user is authenticated before accessing certain routes.
- **errorHandler.js**: Catches and processes errors, sending appropriate responses to the client.
- **logger.js**: Logs incoming requests and responses for monitoring and debugging.

## Usage:
- Middlewares are applied to routes in `routes` folder to manage authentication, validation, or request processing.