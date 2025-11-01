import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" style={{ color: '#0070f3', textDecoration: 'underline', fontSize: '1.15rem' }}>
        Return Home
      </Link>
    </div>
  );
}
