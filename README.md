# Mini Dashboard for Managing Students’ Accounts

## Description
This web application allows users to create, edit, and list student profiles. It includes functionality to search for students by first name.

## Installation

Clone the repository:
```
git clone https://github.com/dianna-paronyan/student-management-dashboard.git
```
Change to the project directory:
```
cd .. Tomo-task
```

### Backend (NodeJS)
Change to the server directory:
```
cd ./server
```

Install the dependencies:
```
npm install
```

Set Up Environment Variables:

```
DB_HOST=localhost
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=5432  # Replace with your database port if different
```

Run the Backend Server:

```
nodemon server.js
```

### Frontend (ReactJS)
Change to the client directory:
```
cd ./client
```
Install the dependencies:
```
npm install
```

Run the Frontend:

```
npm run dev
```
