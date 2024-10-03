# Services

Services contain the business logic of the application.

## Structure:
- Each file is a service that performs operations related to the app's core functionalities (e.g., user registration, order processing).
- Services interact with models to fetch, update, and manipulate data.

## Example:
- **UserService.js**: Manages user registration, login, and profile update logic.
- **OrderService.js**: Handles order creation, status updates, and order history.

## Usage:
- Controllers call these service functions to execute business logic and return the appropriate responses.