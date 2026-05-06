const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// ── Middleware ─────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend connection
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5500',
      'http://127.0.0.1:5500',
      'http://localhost:8080',
      'http://127.0.0.1:8080',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── API Routes ────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/custom-cake', require('./routes/customCakeRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// ── Health Check ──────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🧁 Frosty Fluffs API is running! (Supabase)',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      customCake: '/api/custom-cake',
    },
  });
});

// ── 404 Handler ───────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ── Global Error Handler ──────────────────────────
app.use(errorHandler);

// ── Start Server ──────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🧁 Frosty Fluffs Backend (Supabase)`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Server:      http://localhost:${PORT}`);
  console.log(`   API Base:    http://localhost:${PORT}/api`);
  console.log(`   Supabase:    ${process.env.SUPABASE_URL}\n`);
});
