import express from 'express';
import authRoutes from './routes/auth.route.js';
import globalErrorHandler from './utils/errorHandler.js';
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true, 
}));

app.use('/api/v1/auth', authRoutes);


app.use(globalErrorHandler);

export default app;