# Logs

This folder stores log files generated during runtime.

## Purpose:
- Contains logs for debugging, error tracking, and request monitoring.
- Useful for monitoring the app in production and identifying issues during development.

## Structure:
- **error.log**: Stores error messages and stack traces for troubleshooting.
- **access.log**: Logs all incoming HTTP requests, including status codes and response times.
- **combined.log**: A combination of error and access logs for a complete view of app performance.

## Setup:
- Make sure logging is properly configured in `config/logger.js`.