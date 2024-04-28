import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Error from '@Middleware/error'
import ErrorHandler from '@Utils/errorHandler'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import hpp from 'hpp'
import xss from 'xss-clean'

//routes
import UserRouter from '@Routes/userRoute'

const app = express()
app.enable('trust proxy')

// app.use(express.json())
app.use(express.json({ limit: '1mb' }))
app.use(helmet())
app.use(mongoSanitize())
app.use(compression())
app.use(xss())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cookieParser())

// Prevent parameter pollution. look yt if confuse
app.use(
  hpp({
    whitelist: [
      // enter the query params here
    ],
  })
)

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

app.use(
  cors({
    // origin: 'http://localhost:5173', // Set the specific origin instead of the wildcard '*'
    origin: process.env.FRONTEND_URL || '*',
    credentials: true, // Enable sending cookies and other credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
app.get('/', (req, res) =>
  res.send(
    `<h1>Site is Working. ${
      process.env.FRONTEND_URL
        ? `click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
        : ''
    }`
  )
)
app.use('/api/v1', UserRouter)

//if no api url matched this api fires
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404))
})

//middleware for error
app.use(Error)

export default app
