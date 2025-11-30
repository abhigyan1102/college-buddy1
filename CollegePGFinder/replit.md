# College PG Finder

## Overview

College PG Finder is a location-based web application that helps students discover and evaluate paying guest (PG) accommodations near their college campuses. The platform emphasizes trust through community-verified reviews and provides a map-centric interface inspired by Airbnb's browsing patterns and Google Maps' location-first approach. Students can search for PGs, filter by amenities and preferences, view detailed information including authentic student reviews, and make informed decisions about their accommodation choices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Shadcn UI component library with Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom design system following "New York" style variant with neutral color scheme
- Mobile-first responsive design approach

**State Management Strategy**
- React Query for asynchronous server state (API data, caching, mutations)
- React hooks (useState, useContext) for local component state
- No global state management library (Redux/Zustand) - keeping state localized

**Design Philosophy**
- Location-first interface prioritizing map and proximity-based navigation
- Dense information presentation optimized for quick scanning
- Trust signals through member-verified reviews and ratings
- Utility-focused design over decorative elements

### Backend Architecture

**Server Framework**
- Express.js for RESTful API endpoints
- Node.js runtime with ES modules (type: "module")
- HTTP server created via Node's built-in `http` module

**Development & Production Setup**
- Development: tsx for TypeScript execution with hot reloading
- Production: esbuild bundles server code into single optimized file
- Custom middleware for request logging with timing metrics
- Static file serving for production builds

**Storage Architecture**
- In-memory storage implementation (`MemStorage`) as initial data layer
- Interface-based design (`IStorage`) allows swapping storage backends without code changes
- Prepared for database integration via Drizzle ORM

**API Structure**
- Routes registered centrally via `registerRoutes` function
- All API endpoints prefixed with `/api`
- Storage interface abstraction for CRUD operations
- Separation of concerns: routes, storage, static serving

### Data Storage Solutions

**Database Configuration**
- PostgreSQL as the target relational database
- Neon serverless PostgreSQL for cloud deployment
- WebSocket-based connection pooling for serverless environments

**ORM & Schema Management**
- Drizzle ORM for type-safe database queries
- Zod integration for runtime schema validation
- Schema-first approach with TypeScript type inference
- Migration files generated in `/migrations` directory

**Current Schema**
- Users table with UUID primary keys, username, and password fields
- Prepared for PG accommodations, reviews, and amenity data structures

**Data Modeling Approach**
- Relational model for core entities (users, PGs, reviews)
- Type safety from database to frontend via shared schema definitions
- Insert schemas with Zod validation for data integrity

### Authentication & Authorization

**Strategy**
- Prepared for session-based authentication (connect-pg-simple package included)
- User credential storage with hashed passwords
- Interface methods for user lookup by ID and username

**Session Management**
- PostgreSQL session store via connect-pg-simple
- Express-session middleware ready for integration
- Cookie-based session tracking

### External Dependencies

**Third-Party Services**
- Google Fonts CDN for Inter typography (primary UI font)
- Neon Database for serverless PostgreSQL hosting

**Development Tools**
- Replit-specific plugins for dev banner, error overlay, and cartographer
- Vite plugins for React Fast Refresh and runtime error handling

**Build & Deployment**
- esbuild for server bundling with selective dependency externalization
- Whitelist approach bundles specific dependencies to reduce cold start times
- Separate client and server build processes

**UI Dependencies**
- Radix UI component primitives (40+ packages for dialogs, dropdowns, etc.)
- Class Variance Authority (CVA) for component variant management
- CMDK for command palette functionality
- Embla Carousel for image galleries

**Utilities**
- clsx and tailwind-merge for conditional class composition
- date-fns for date formatting and manipulation
- nanoid for unique ID generation
- Zod for schema validation across the stack

**Future Integration Points**
- Google Maps API for interactive map functionality (currently using placeholder)
- Email service (Nodemailer included but not configured)
- Payment processing (Stripe package available)
- AI integrations (OpenAI, Google Generative AI packages included)