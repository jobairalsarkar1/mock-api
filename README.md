# PlaceAPI

A mock API platform built with **Next.js 15**, **TypeScript**, and **Prisma** that helps developers create, test, and manage API endpoints without setting up a complete backend.


## Features

* Create and manage mock API endpoints
* Test API responses during development
* Authentication with Auth.js and Prisma Adapter
* Email integration using Resend
* Analytics dashboard powered by Recharts
* Fast and responsive UI with Tailwind CSS
* Lightweight state management with Zustand

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-000000?style=for-the-badge\&logo=auth0\&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-181717?style=for-the-badge\&logo=react\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-61DAFB?style=for-the-badge\&logo=recharts\&logoColor=black)


## Getting Started

### Clone the Repository

```bash
git clone git@github.com:jobairalsarkar1/mock-api.git
cd mock-api
```

### Install Dependencies

```bash
npm install
```

### Setup Environment

Create a `.env` file in the project root and configure the following:

```env
# Database URL (PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require&channel_binding=require

# Auth.js Secret
NEXTAUTH_SECRET=your_nextauth_secret_here

# Resend
AUTH_RESEND_KEY=your_resend_key_here
RESEND_API_KEY=your_resend_key_here

# Google OAuth
AUTH_GOOGLE_ID=your_google_client_id_here
AUTH_GOOGLE_SECRET=your_google_client_secret_here

# GitHub OAuth
AUTH_GITHUB_ID=your_github_client_id_here
AUTH_GITHUB_SECRET=your_github_client_secret_here
```

### Run the Project

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

## Author

**Jobair Al Sarkar** | Software Engineer

Portfolio: https://www.jobairalsarkar.com<br>
Email: [jobair.a.sarkar@gmail.com](mailto:jobair.a.sarkar@gmail.com)


[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/jobairalsarkar1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/jobair-al-sarkar)

---

## License

This project is licensed under the **Apache License 2.0**.
