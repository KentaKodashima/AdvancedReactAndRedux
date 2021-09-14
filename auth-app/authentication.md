# Authentication

## Basic steps
1. (Client) Enter username and password
2. (Server) Checks the user name and password
3. (Server) If the credentials are good, giev an piece of information that should be included on all future requests (token or cookie)
4. (Client) Client can make authenticated requests
5. (Client) Client sends a request with the identifying piece of info (token or cookie)
6. (Server) Varifies the token or cookie and sends back the resource

## Cookies vs tokens
### Coookie
- Automatically includedd on all requests
- Unique to each domain
- Cannot be sent to different domains

### Tokens
- Have to manually wire up by including `authorization: token` to the HTTP request's header
- Can be sent to any domain
- Tokens are more scalable than cookies

## Scalable architecture
For the example app, there would be a content server and API server. The content server only serves index.html and bundle.js which acts as the client side of the app. And the API server handles API requests.

## Password encryption using bcrypt
The "bcrypt" library encrypts a password using solt and hash. A salt is a randomly generated string of characters created when saving a password. After a solt is generated, bcrypt combines the solt and hashed password to create a new hashed password string.

## JSON Web Token
In the example app, the app uses user id and secret string to generate JWT. And the user includes the token in the future requests and the app decrypt it using the secret string to varify the user and get the user id.