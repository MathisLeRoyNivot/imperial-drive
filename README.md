# Imperial Drive

Imperial Drive is a premium car rental platform that delivers an exceptional user experience for booking luxury vehicles. Built with modern technologies and a focus on performance and design, Imperial Drive provides a seamless solution for both renters and administrators.

## Project Tech Stack

-   **[Next.js 15](https://nextjs.org/):** A powerful React framework for building server-rendered and statically generated web applications.
-   **[Clerk](https://clerk.com/):** Secure user authentication and management.
-   **[HyGraph](https://app.hygraph.com/):** A headless CMS powered by GraphQL for dynamic content management.
-   **[Tailwind CSS](https://tailwindcss.com/)** & **[shadcn/ui](https://ui.shadcn.com/):** Utility-first CSS framework and modern UI components to build beautiful, responsive designs.

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v14 or later)
-   Your preferred package manager (npm, yarn, pnpm, or bun)

### Setup Environment

Create a `.env.local` file in the root directory of your project with the following variables:

```bash
# .env.local

# Clerk Authentication Keys (get these from https://clerk.com/)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_next_public_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>

# Add additional environment variables required by HyGraph or other services here.
```

### Running the Development Server

Start the development server using one of the following commands:

```bash
Copier
# Using npm:
npm run dev

# Using yarn:
yarn dev

# Using pnpm:
pnpm dev

# Using bun:
bun dev
```

Open http://localhost:3000 in your browser to view the application.

## Features

-   **Premium Rental Experience**: Browse a curated selection of luxury cars.
-   **Secure Authentication**: Robust user management with Clerk.
-   **Dynamic Content**: Manage and update content seamlessly using HyGraph and GraphQL.
-   **Modern, Responsive UI**: Styled with Tailwind CSS and shadcn/ui for a polished, mobile-friendly design.
