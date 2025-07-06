import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

connectDB();//conncet to mongodb Atlas
connectCloudinary();//connect to cloudinary server

const app = express();
app.use(cors());//Enable Cross-Origin Resource Sharings

//API to listen to stripe Webhooks
app.post('/api/stripe', express.raw({ type: "application/json" }), stripeWebhooks);

//Clerk-Middleware
app.use(express.json());
app.use(clerkMiddleware());

//API to listen to  Clerk Webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.send('API is working....!'));
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is running at localhost:${PORT}`));