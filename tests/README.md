# Tests

This folder contains all unit and integration tests for the backend.

## Structure:
- **unit/**: Tests for individual functions and modules (e.g., testing services and utilities).
- **integration/**: Tests for API routes and interaction between different parts of the system (e.g., controller-service-database integration).
- **mocks/**: Mock data and functions for simulating database queries and external services.

## Testing Framework:
- We are using **Jest** for testing.
- Run tests with the command `npm run test`.

## Example:
- **User.test.js**: Unit test for user-related services and controllers.
- **Order.test.js**: Integration test for order-related API endpoints.