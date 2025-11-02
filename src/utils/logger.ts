import winston from 'winston';

// Check if we're in a serverless environment (Netlify, Vercel, etc.)
const isServerless = 
  process.env.VERCEL || 
  process.env.NETLIFY_DEPLOY_PRIME_URL || 
  process.env.NETLIFY ||
  process.env.AWS_LAMBDA_FUNCTION_NAME;

// Create transports based on environment
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
];

// Only add file transports in non-serverless environments
if (!isServerless) {
  try {
    transports.push(
      new winston.transports.File({ 
        filename: 'logs/error.log', 
        level: 'error' 
      }),
      new winston.transports.File({ 
        filename: 'logs/combined.log' 
      })
    );
  } catch (error) {
    // If file logging fails, just use console
    console.warn('File logging not available, using console only');
  }
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports,
});

export default logger; 