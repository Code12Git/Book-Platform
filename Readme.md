# Book Exchange Platform


## Overview


**Objective:**  
The "Book Exchange Platform" is a web application designed to connect book enthusiasts who want to exchange books with one another. Users can create an account, list books they wish to exchange, and find matches with other users based on their book preferences.

**Features:**  

- User Registration and Login: Allows users to create an account, log in, and log out securely.
- Book Listing: Users can list books they own and wish to exchange, including details such as title, author, and genre.
- Book Discovery: Users can browse and filter books listed by others.
- Matchmaking: Users can view potential matches based on their book preferences and initiate exchanges.
- Exchange Requests: Users can send and receive requests to exchange books.

## UI Design

The application features a clean and user-friendly interface, utilizing an existing CSS library for styling. The UI includes:

- User Registration and Login Page: For account management.
- Book Listing Page: For adding, editing, and removing books.
- Book Discovery Page: For browsing and filtering books.
- Matchmaking Page: For viewing and initiating exchanges.


## Functionality

- User Authentication: Secure registration, login, and logout functionalities.
- Book Management: Listing, editing, and removing books.
- Book Matching: Basic algorithm to suggest potential matches.
- Exchange Requests: Functionality to send and receive book exchange requests.

## Database Integration

- Database Setup: Stores user information, book listings, and exchange requests.
- Relationships: Ensures proper relationships between users, their books, and requests.


## Project Setup

### 1. Set Up the Project

- Create a new Node.js project using Express.js.
- Set up a basic server with a single endpoint to check if the server is running (e.g., `GET /ping`).

### 2. Design the User Interface

  - `User Registration and Login Page`: Allows users to sign up, log in, and log out.
  - `Book Listing Page`: Users can list books they own and want to exchange, such as title, author, and genre.
  - `Book Discovery Page`: Users can browse and filter books listed by others.
  - `Matchmaking Page`: Users can view potential matches based on their book   preferences and initiate exchanges.

### 3.  API Endpoints

- **User Authentication:**
  - Endpoint: `POST /register`:  Register a new user.
  - Endpoint: `POST /login`:  Log in an existing user.

- **Book Management:**
  - Endpoint: `POST /books`:  List a new book.
  - Endpoint: `GET /books`:  Get a list of all books listed by all user.
  - Endpoint: `GET /books/book`:  Get a list of all books listed by logged in user.
  - Endpoint: `PUT /books/:id`:  Edit a book listing
  - Endpoint: `DELETE /books/:id`: Remove a book listing.

- **Book Matching:**
  - Endpoint:`POST /exchange`:Send a request to exchange books with another user.
  - Endpoint:`POST /:requestId`:Change the status of request.



### 4. Error Handling

- Implement error handling for cases such as trying to access a non-existent card, validation errors, and server errors.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Code12Git/Book-Platform.git
    

2. Navigate to the project directory:

   ```bash
   cd book-platform

3. Install the dependencies:

   ```bash
    npm install

### Sample .env file

### Server configuration
- APP_PORT=8000
- LOG_LEVEL=debug
- NODE_ENV=development


### Database configuration
- NOSQL_DATABASE_URL=your_database_url


### JWT Secret for authentication
- JWT_SECRET=your_jwt_secret

# Other configurations
# Add any other environment variables your application requires    


### Running the Server

1. Start the server:

   ```bash
   npm start
   
2. The server will be running at http://localhost:8000.

3. Check if the server is running by visiting:

   ```bash
   GET http://localhost:8000/ping

    

## Error Handling

- 404 Not Found for non-existent books.
- 400 Bad Request for validation errors.
- 500 Internal Server Error for server issues.





## License

This project is licensed under the MIT License - see the LICENSE file for details.

```bash
Replace `https://github.com/Code12Git/Book-Platform.git` 
with the actual URL of your repository. Let me know if 
you need any additional details!

