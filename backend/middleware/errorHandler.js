/**
 * Global error handling middleware.
 * Catches all errors passed via next(error) and returns a structured JSON response.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log error for development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  }

  // Supabase / PostgreSQL error codes
  if (err.code === '23505') {
    // Unique constraint violation
    message = 'A record with this value already exists';
    statusCode = 400;
  }

  if (err.code === '23503') {
    // Foreign key violation
    message = 'Referenced resource not found';
    statusCode = 400;
  }

  if (err.code === '23514') {
    // Check constraint violation
    message = 'Invalid value provided';
    statusCode = 400;
  }

  if (err.code === '22P02') {
    // Invalid UUID format
    message = 'Invalid ID format';
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
