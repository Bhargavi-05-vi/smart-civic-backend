# Smart Civic Issue Reporting System (Backend)

This is the backend for the Smart Civic Issue Reporting System.  
It allows users to report civic issues such as potholes, garbage, and streetlight failures etc.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Multer

## Features

- Create a complaint
- Upload complaint image
- Automatically calculate complaint priority
- View all complaints
- Filter complaints by status
- Update complaint status
- Delete complaints

## API Endpoints

### Get all complaints

GET /complaints

### Get complaint by ID

GET /complaints/:id

### Create complaint

POST /complaints

### Update complaint status

PUT /complaints/:id/status

### Delete complaint

DELETE /complaints/:id

## How to Run the Project

1. Install dependencies
   npm install
2. Start the server
   node index.js
3. Server will run on
   http://localhost:5000
