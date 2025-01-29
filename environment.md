# Environment Variables

This document contains the environment variables required for the backend of the medical consultation application.

- **PORT**: The port number on which the server will run. Default is `80`.
- **DATABASE_URL**: The URL for connecting to the MySQL database. It includes the username, password, host, port, and database name.
- **AUTH_ISSUER_BASE_URL**: The base URL for the Auth0 issuer. This is used for authentication purposes.
- **AUTH0_API_AUDIENCE**: The audience identifier for the Auth0 API. This is used to specify the API that the tokens are intended for.

Ensure these variables are set correctly in your environment to enable proper functioning of the application.