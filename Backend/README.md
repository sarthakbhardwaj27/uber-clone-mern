# User Registration API Endpoint

## Route Information
- **Endpoint:** `/users/register`
- **HTTP Method:** POST
- **Description:** Register a new user in the system

## Request Details

### Required Fields
| Field | Type | Validation Rules |
|-------|------|-----------------|
| `fullName.firstName` | String | - Required<br>- Minimum 3 characters long |
| `fullName.lastName` | String | - Optional<br>- Minimum 3 characters long (if provided) |
| `email` | String | - Required<br>- Valid email format<br>- Minimum 5 characters long<br>- Must be unique |
| `password` | String | - Required<br>- Minimum 6 characters long |

### Request Body Example
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "securePassword123"
}
```

## Response Details

### Successful Response
- **Status Code:** `201 Created`
- **Response Body:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "uniqueMongoDBObjectId",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "johndoe@example.com"
    }
}
```

### Error Responses

#### Validation Errors
- **Status Code:** `400 Bad Request`
- **Possible Error Scenarios:**
  1. Invalid email format
  2. First name less than 3 characters
  3. Password less than 6 characters

**Example Validation Error:**
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "First name should be 3 letters long",
            "path": "fullName.firstName",
            "location": "body"
        }
    ]
}
```

#### Duplicate Email Error
- **Status Code:** `400 Bad Request`
- **Error Message:** Indicates email already exists in the system

## Authentication
- Upon successful registration, a JWT token is generated
- Token can be used for subsequent authenticated requests
- Token contains the user's unique MongoDB `_id`

## Security Notes
- Passwords are hashed before storing in the database
- Password field is not returned in user object responses
- Email must be unique across the system

## Example Curl Request
```bash
curl -X POST http://your-api-domain.com/users/register \
     -H "Content-Type: application/json" \
     -d '{
         "fullName": {
             "firstName": "John",
             "lastName": "Doe"
         },
         "email": "johndoe@example.com",
         "password": "securePassword123"
     }'
```

## Possible Improvements
- Add email verification
- Implement stronger password requirements
- Add rate limiting to prevent brute-force attacks

# User Login API Endpoint

## Route Information
- **Endpoint:** `/users/login`
- **HTTP Method:** POST
- **Description:** Authenticate a user and generate an access token

## Request Details

### Required Fields
| Field | Type | Validation Rules |
|-------|------|-----------------|
| `email` | String | - Required<br>- Valid email format |
| `password` | String | - Required<br>- Minimum 6 characters long |

### Request Body Example
```json
{
    "email": "johndoe@example.com",
    "password": "securePassword123"
}
```

## Response Details

### Successful Response
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "uniqueMongoDBObjectId",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "johndoe@example.com"
    }
}
```

### Error Responses

#### Validation Errors
- **Status Code:** `400 Bad Request`
- **Possible Error Scenarios:**
  1. Invalid email format
  2. Password less than 6 characters

**Example Validation Error:**
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Invalid Email",
            "path": "email",
            "location": "body"
        }
    ]
}
```

#### Authentication Errors
- **Status Code:** `401 Unauthorized`
- **Possible Error Scenarios:**
  1. Email not found in the system
  2. Incorrect password

**Example Authentication Error:**
```json
{
    "error": "Invalid credentials"
}
```

## Authentication Process
1. Validate email format and password length
2. Find user by email (including password for comparison)
3. Compare provided password with stored hashed password
4. If credentials are valid, generate JWT token
5. Return token and user information (excluding password)

## Security Notes
- Passwords are compared using bcrypt for secure hash comparison
- JWT token contains only the user's MongoDB `_id`
- Password is never returned in the user object
- Uses select('+password') to retrieve password for verification

## Example Curl Request
```bash
curl -X POST http://your-api-domain.com/users/login \
     -H "Content-Type: application/json" \
     -d '{
         "email": "johndoe@example.com",
         "password": "securePassword123"
     }'
```

## Possible Improvements
- Implement login attempt tracking
- Add account lockout after multiple failed attempts
- Include refresh token mechanism
- Add two-factor authentication
- Implement login activity logging
