import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import uploadRoutes from './routes/uploads.js';
dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', uploadRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});