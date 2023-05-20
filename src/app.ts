import express from 'express';
import Error from './middleware/error';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// routers
import UserRouter from './routes/userRoute';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/v1', UserRouter);

//middleware for error
app.use(Error);

export default app;
