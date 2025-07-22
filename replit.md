# CUBIQ Accounting Website

## Overview

This is a modern, responsive website for CUBIQ, a boutique accounting firm based in Paarl. The application is built as a full-stack TypeScript application using React for the frontend and Express.js for the backend, with a PostgreSQL database for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✓ Implemented 60-30-10 color strategy across entire website:
  - 60% Neutral: Pure white backgrounds, light grey sections, black text
  - 30% Secondary: Hunter green headers, navigation elements, cards
  - 10% Accent: Emerald green for CTAs, buttons, hover states, dividers

✓ Updated navigation bar with modern Kvistly-inspired design:
  - Centered navigation pills with rounded backgrounds
  - Geometric logo with lowercase "cubiq" branding
  - Login/Get Started buttons with emerald accent colors

✓ Enhanced visual hierarchy with consistent color application:
  - All body text converted to pure black for maximum contrast
  - Hunter green for all section headers and primary elements
  - Emerald green for call-to-action elements and interactive states
  - Improved shadows, rounded corners, and modern card designs

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React 18 with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Deployment**: Built for production with esbuild for the server and Vite for the client

## Key Components

### Frontend Architecture
- **React Router**: Using Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors (khaki, hunter green, light grey, black olive)
- **Forms**: React Hook Form with Zod validation
- **Fonts**: Google Fonts integration (Montserrat, Inter, Playfair Display)

### Backend Architecture
- **Express.js**: RESTful API server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Uses connect-pg-simple for PostgreSQL session storage
- **Data Validation**: Zod schemas for runtime type checking
- **Development**: Hot reload with tsx in development mode

### Database Schema
The application uses two main tables:
- **users**: Basic user authentication (id, username, password)
- **contact_messages**: Store contact form submissions (id, name, email, message, createdAt)

### Data Storage
- **Production**: PostgreSQL database via Neon serverless
- **Development**: In-memory storage fallback for development environments
- **Migrations**: Drizzle Kit for database schema management

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on homepage
   - Frontend validates data using Zod schema
   - Data sent to `/api/contact` endpoint via TanStack Query mutation
   - Backend validates and stores in PostgreSQL
   - Success/error feedback via toast notifications

2. **Admin Access**:
   - `/api/contact-messages` endpoint retrieves all contact submissions
   - Protected endpoint for administrative purposes

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with Wouter routing
- **Component Library**: Radix UI primitives via shadcn/ui
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Carousel**: Embla Carousel React

### Backend Dependencies
- **Server Framework**: Express.js
- **Database**: Drizzle ORM with @neondatabase/serverless
- **Session Storage**: connect-pg-simple
- **Validation**: Zod with drizzle-zod integration
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend
- **TypeScript**: Full TypeScript support across the stack
- **Linting/Formatting**: TypeScript compiler for type checking
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

The application is configured for production deployment with:

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Assets**: Static assets served from the build output

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Sessions**: PostgreSQL-backed sessions for production scalability
- **Development**: Vite dev server with HMR and error overlay

### Production Considerations
- **Static File Serving**: Express serves built React app in production
- **Database Migrations**: Drizzle migrations managed via `npm run db:push`
- **Environment Detection**: Different behavior for development vs production
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

The architecture emphasizes type safety, developer experience, and modern web development practices while maintaining simplicity and reliability for a small business website.