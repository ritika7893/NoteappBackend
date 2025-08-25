import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import authRoutes from './routes/authRoutes.js'
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from '../config/db.js';
const PORT=process.env.PORT
const app = express();
connectDB()
app.use(express.json())
app.use('/api/notes', notesRoutes);
app.use('/api/auth',authRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);