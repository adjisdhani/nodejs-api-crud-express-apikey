# Restful API with Node.js, MySQL, and API Key Authentication

This project is a **RESTful API** built with **Node.js**, **Express**, and **MySQL**. It includes **API Key Authentication** for security and uses **Joi** and **Validator** for input validation.

---

## Features
- **CRUD Operations** (Create, Read, Update, Delete) for Books and Users
- **API Key Authentication** for security
- **Validation using Joi and Validator**
- **Rate Limiting** to prevent abuse
- **CORS Handling** for secure access
- **Secure Headers** using Helmet
- **Environment Variables** for configuration

---

## Installation

### **1. Clone the repository**
```sh
git clone https://github.com/adjisdhani/nodejs-api-crud-express-apikey.git
```

### **2. Navigate to the project directory**
```sh
cd nodejs-api-crud-express-apikey
```

### **3. Install dependencies**
```sh
npm install --save-dev
```

### **4. Configure Environment Variables**
Create a `.env` file in the root directory and set your MySQL configuration:
```ini
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
JWT_SECRET=yoursecretkey
API_KEY_EXPIRATION=10m
```

### **5. Set up the database**
Ensure MySQL is running and execute the provided SQL script to create the required tables.

```sh
mysql -u root -p yourdatabase < database/schema.sql
```

---

## Running the Server

### **Start the API Server**
```sh
npm run dev
```

The server should now be running on `http://localhost:3000`

---

## API Endpoints

### **Authentication (API Key Management)**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/v1/generate-key` | Generate a new API Key |

### **User Management**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/v1/users/register` | Register a new user |
| `GET`  | `/api/v1/users` | Get all users |

### **Book Management**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/v1/books` | Add a new book |
| `GET`  | `/api/v1/books` | Get all books |
| `GET`  | `/api/v1/books/:id` | Get a book by ID |
| `PUT`  | `/api/v1/books/:id` | Update a book |
| `DELETE` | `/api/v1/books/:id` | Delete a book |

---

## Testing the API

You can use **Postman**, **cURL**, or **REST Client** to test the API.

### **1. Generate an API Key**
Send a `POST` request to:
```sh
http://localhost:3000/api/v1/generate-key
```

Example Response:
```json
{
  "api_key": "1234567890abcdef",
  "expires_at": "2025-02-05T12:00:00Z"
}
```

### **2. Use API Key for Authentication**
Include the API Key in the request header:
```sh
curl -H "api_key: 1234567890abcdef" http://localhost:3000/api/v1/books
```

### **3. Create a New Book**
```sh
curl -X POST http://localhost:3000/api/v1/books \
-H "Content-Type: application/json" \
-H "api_key: 1234567890abcdef" \
-d '{ "title": "New Book", "author": "John Doe", "year": 2024 }'
```

### **4. Get All Books**
```sh
curl -H "api_key: 1234567890abcdef" http://localhost:3000/api/v1/books
```

### **5. Delete a Book**
```sh
curl -X DELETE http://localhost:3000/api/v1/books/1 -H "api_key: 1234567890abcdef"
```

---

## Security Features Implemented

### ✅ **API Key Authentication**
Each request must include a **valid API Key** in the headers to be authorized.

### ✅ **Input Validation**
Using **Joi** and **Validator** to validate user input before processing.

### ✅ **Rate Limiting**
Prevents abuse by limiting the number of requests per minute.

### ✅ **CORS Handling**
Restricts access to specific domains using CORS policy.

### ✅ **Secure Headers**
Uses `helmet` to enforce secure HTTP headers.

---

## Author
Adjis Ramadhani Utomo

## License
This project is licensed under the MIT License.