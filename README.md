# Remedium

[![Remedium](https://github.com/GimmyR/remedium/actions/workflows/ci.yaml/badge.svg)](https://github.com/GimmyR/remedium/actions/workflows/ci.yaml)

Remedium is a web application that allows to test chemical compounds in order to create a medication.

It is built with:

- **Next.js** for the frontend  
- **Nestjs** for the API  
- **PostgreSQL** for data persistence  
- **Docker** for containerized deployment

## Prerequisites

Before building or running the application, make sure you have the following installed :

* **Docker** 29.0.2
* **Docker Compose** 2.40.3

## Environment variables

```bash
# Database (PostgreSQL)
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_name=your_database_name

# Password hashing strength (bcrypt cost)
PASSWORD_STRENGTH=12

# JWT (HS512 requires at least 64 bytes)
JWT_SECRET=your_very_long_random_secret_key_here_at_least_64_bytes

# API URL
NEXT_PUBLIC_CLIENT_SIDE_TO_API=http://localhost:8000
```

If you want to use a `.env` file, place it in the project's root directory.

## Launch the application

Open a terminal in the project's root directory and run the following command :

```bash
docker compose --profile prod up --build
```

You can access the frontend application in your browser at http://localhost:3000 .

The API documentation is available at http://localhost:8000/docs .

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.