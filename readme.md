# Furniture E-Commerce Project

This is a full-stack e-commerce project for a furniture store, built using **NestJS** and **ReactJS**. The project is still in progress, with features being developed and reviewed.

## Tech Stack

### Backend:
- **NestJS**: A framework for building scalable and maintainable server-side applications.
- **Redis**: Used for caching to improve performance.
- **TypeORM**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Relational database used to store data.
- **Swagger**: For API documentation and testing.
  
### Frontend:
- **ReactJS**: A JavaScript library for building user interfaces.
- **Redux**: For advanced state management and handling complex data flow.
- **Tailwind CSS**: For styling, ensuring a modern and responsive design.

## Project Structure

The project follows best practices, ensuring code readability, scalability, and maintainability. Here are some highlights:

- **Uniform Response Structure**: The backend is designed to return responses in a consistent format for ease of use and clarity.
- **Advanced State Management**: Redux is used for managing application state in a structured way, allowing for a clear and predictable data flow.
- **Authentication Middlewares & Role Guards**: Secure routes using custom authentication middlewares and role guards to manage access levels.
- **Structured Folders & Files**: The project is organized with clearly defined directories and files to separate concerns, making it easier to scale the application and onboard new developers.
- **Caching**: Redis is implemented for caching commonly accessed data to reduce load times and improve performance.
- **Modern Responsive Design**: Tailwind CSS ensures that the front-end design is modern, visually appealing, and responsive across devices.

## Current Progress

This project is still a work in progress. Key functionalities are being developed and reviewed by senior mentors to ensure that best practices are followed throughout.

## Environment Variables

### Backend (.env.example)

Create a `.env` file in the root of the backend folder with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT Configuration
JWT_SECRET=your_jwt_secret

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Cache Configuration
CACHE_TTL=3600

# Application Configuration
APP_PORT=3000
FRONTEND_BASE_URL=http://localhost:3000
BACKEND_BASE_URL=http://localhost:3000


# Frontend (.env.example)

# Create a .env file in the root of the frontend folder with the following variables:

# API Base URL
VITE_API_BASE_URL=http://localhost:3000

# Other Frontend Configs
VITE_ENV=development

# Redis Setup
To run Redis with the project:

# 1. Install Redis
# If you don't have Redis installed, you can download and install it from the official Redis website: https://redis.io/download.

# 2. Start Redis
# If you're using Redis locally, run the following command to start the Redis server:
redis-server

# 3. Configure Redis
# The backend is configured to connect to Redis on localhost:6379 by default, 
# but you can change the host and port in the .env file as needed.

# 4. Verify Redis Connection
# You can check if Redis is running by connecting to it using the Redis CLI:
redis-cli
ping
# If the response is PONG, Redis is successfully running.


# How to Run the Project

## Backend

# 1. Clone the repository:
git clone <repo-url>

# 2. Install the dependencies:
cd backend
npm install

# 3. Set up your PostgreSQL database and configure the .env file.

# 4. Run the Redis server as explained above.

# 5. Run the backend application:
npm run start:dev

# 6. Access the API documentation at http://localhost:3000/api.

## Frontend

# 1. Clone the repository:
git clone <repo-url>

# 2. Install the dependencies:
cd frontend
npm install

# 3. Configure the .env file with the correct API URL (VITE_API_BASE_URL).

# 4. Run the development server:
npm run dev

# 5. Open the app in your browser at http://localhost:5173.
