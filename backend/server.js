// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // for image data or base64

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

// DB & Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log('Server running on port', process.env.PORT || 5000)
    );
  })
  .catch((err) => console.error(err));
