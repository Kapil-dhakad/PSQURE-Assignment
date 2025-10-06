import express from 'express';
import authRoutes from './routes/auth.route.js';
import globalErrorHandler from './utils/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);


app.use(globalErrorHandler);

export default app;