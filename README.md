# Avendano-445566 Project

## Description

This project includes a backend developed with NestJS and a frontend built with Vite and React.

## Requirements

To run this application, you will need to have the following tools installed:

### Backend

- Node.js: ^18.17.0
- npm: ^9.6.0

### Backend Dependencies

- @nestjs/common: ^10.0.0
- @nestjs/core: ^10.0.0
- @nestjs/mapped-types: *
- @nestjs/platform-express: ^10.0.0
- @prisma/client: 5.14.0
- reflect-metadata: ^0.2.0
- res: ^0.4.0
- rxjs: ^7.8.1

### Backend Development Dependencies

- @nestjs/cli: ^10.0.0
- @nestjs/schematics: ^10.0.0
- @nestjs/testing: ^10.0.0
- @types/express: ^4.17.17
- @types/jest: ^29.5.2
- @types/node: ^20.3.1
- @types/supertest: ^6.0.0
- @typescript-eslint/eslint-plugin: ^6.0.0
- @typescript-eslint/parser: ^6.0.0
- eslint: ^8.42.0
- eslint-config-prettier: ^9.0.0
- eslint-plugin-prettier: ^5.0.0
- jest: ^29.5.0
- prettier: ^3.0.0
- prisma: ^5.14.0
- source-map-support: ^0.5.21
- supertest: ^6.3.3
- ts-jest: ^29.1.0
- ts-loader: ^9.4.3
- ts-node: ^10.9.1
- tsconfig-paths: ^4.2.0
- typescript: ^5.1.3

### Frontend

- Node.js: ^18.17.0
- npm: ^9.6.0

### Frontend Dependencies

- @heroicons/react: ^2.1.3
- @tanstack/react-query: ^5.40.1
- react: ^18.2.0
- react-dom: ^18.2.0
- sonner: ^1.4.41

### Frontend Development Dependencies

- @types/react: ^18.2.66
- @types/react-dom: ^18.2.22
- @typescript-eslint/eslint-plugin: ^7.2.0
- @typescript-eslint/parser: ^7.2.0
- @vitejs/plugin-react-swc: ^3.5.0
- autoprefixer: ^10.4.19
- eslint: ^8.57.0
- eslint-plugin-react-hooks: ^4.6.0
- eslint-plugin-react-refresh: ^0.4.6
- postcss: ^8.4.38
- tailwindcss: ^3.4.3
- typescript: ^5.2.2
- vite: ^5.2.0

## Configuration

1. Clone the repository:

    ```bash
    git clone <REPOSITORY_URL>
    ```

2. Navigate to the backend and frontend directories to install dependencies:

    ```bash
    cd backend
    npm install

    cd ../frontend
    npm install
    ```

3. Add environment variables:

    For the frontend, create a `.env` file in the `frontend` directory with the following content:

    ```env
    VITE_SERVER_URL='http://localhost:3000'
    ```

    For the backend, create a `.env` file in the `backend` directory with the following content:

    ```env
    DATABASE_URL="postgresql://admin:admin@localhost:5433/notes?schema=public"
    ```

4. To run the setup script:

    ```bash
    chmod +x setup.sh
    ./setup.sh
    ```

This script will create the necessary `.env` files, start the Docker containers, set up Prisma (initialize, migrate, generate), and run both the backend and frontend.

## Docker

The project includes a `docker-compose.yml` file to facilitate environment setup using Docker.

1. Ensure you have Docker and Docker Compose installed.
2. Navigate to the project directory and run:

    ```bash
    docker-compose up --build
    ```

This will start the necessary services for both the backend and the frontend.

## Prisma

To apply Prisma migrations, use the following command in the backend directory:

```bash
cd backend
npx prisma migrate dev
