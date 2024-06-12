#!/bin/bash

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: Docker is not installed.' >&2
  exit 1
fi

# Check if npm is installed
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' >&2
  exit 1
fi

# Create .env file for backend
BACKEND_ENV_FILE="./backend/.env"
if [ ! -f $BACKEND_ENV_FILE ]; then
  echo "Creating backend .env file..."
  cat <<EOT >> $BACKEND_ENV_FILE
DATABASE_URL="postgresql://admin:admin@localhost:5433/notes?schema=public"
EOT
else
  echo "Backend .env file already exists."
fi

# Create .env file for frontend
FRONTEND_ENV_FILE="./frontend/.env"
if [ ! -f $FRONTEND_ENV_FILE ]; then
  echo "Creating frontend .env file..."
  cat <<EOT >> $FRONTEND_ENV_FILE
VITE_SERVER_URL='http://localhost:3000'
EOT
else
  echo "Frontend .env file already exists."
fi

# Start Docker containers
echo "Starting Docker containers..."
docker-compose up -d --build

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! docker exec -t $(docker ps -q -f name=postgres) pg_isready -U admin > /dev/null 2>&1; do
  sleep 1
done

# Navigate to backend and set up Prisma
echo "Setting up Prisma..."
cd backend
npm install

# Initialize Prisma
npx prisma init

# Apply migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Navigate to frontend and install dependencies
echo "Setting up frontend..."
cd ../frontend
npm install

# Start backend and frontend
echo "Starting backend and frontend..."
npm run dev & cd ../backend && npm run start:dev

echo "Setup complete. The application is running."
