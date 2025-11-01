# Hilbrick-Rockle LAW Website

A professional legal firm website built with modern web technologies, focusing on user experience and accessibility.

## Project Overview

This project is a professional legal firm website for Hilbrick-Rockle LAW. The website is fully responsive, accessible, and optimized for search engines.

## Key Features

### 1. Homepage
- Hero section with dynamic content
- Featured practice areas
- Latest insights
- Global presence map
- Client testimonials
- Quick links to key services

### 2. About Page
- Firm history timeline
- Core values and mission statement
- Leadership team profiles
- Diversity and inclusion initiatives
- Global presence overview

### 3. Practice Areas
- Comprehensive list of legal services
- Detailed service descriptions
- Related case studies
- Industry expertise
- Team members by practice area

### 4. Insights
- Latest insights
- Client resources

### 5. Events
- Upcoming events calendar
- Past events archive
- Webinar recordings
- Conference information
- Event registration system

### 6. Careers
- Job listings with application forms
- Culture and values
- Professional development
- Benefits and compensation
- Application portal with database integration

### 7. Client Resources
- Document library
- Client portal
- Knowledge center
- Forms and templates
- Client alerts subscription

### 8. Contact Page
- Global office locations
- Interactive map
- Contact forms
- Office directory
- Social media links

### 9. Admin Dashboard
- Manage appointments
- View contact messages
- Manage job applications
- Lawyer management
- Document links management

## Technical Specifications

### Frontend
- React.js for component-based architecture
- Next.js for server-side rendering and routing
- Tailwind CSS for styling
- Framer Motion for animations
- TypeScript for type safety

### Backend
- Next.js API routes
- Supabase for database (PostgreSQL)
- MailerSend for email notifications
- File upload handling

### Database
- Supabase (PostgreSQL)
- Tables: appointments, contact_messages, lawyers, job_applications, document_links

### Performance & SEO
- Server-side rendering
- Image optimization
- Lazy loading
- Meta tags optimization

### Accessibility
- WCAG 2.1 compliance
- ARIA labels
- Keyboard navigation
- Screen reader compatibility
- Color contrast compliance

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Next.js pages
├── styles/            # Global styles and Tailwind config
├── lib/               # Utility functions and helpers
├── types/             # TypeScript type definitions
├── api/               # API routes and services
├── utils/             # Utility functions
└── middleware/        # Middleware functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   MAILERSEND_API_KEY=your_mailersend_key
   MAILERSEND_FROM_EMAIL=noreply@yourdomain.com
   MAILERSEND_FROM_NAME=Hilbrick&Rockle Legal
   NOTIFICATION_EMAIL=admin@yourdomain.com
   ```
4. Set up the database:
   - Run the SQL in `supabase.sql` in your Supabase SQL Editor
5. Run the development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

- Follow the established coding standards
- Ensure responsive design for all new features
- Maintain accessibility standards
- Document new features and components

## Deployment

The application can be deployed using:
- Vercel for frontend hosting
- Supabase for database
- Environment variables for configuration

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass
5. Get code review approval

## License

This project is licensed under the MIT License - see the LICENSE file for details.
