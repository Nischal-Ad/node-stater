import express from 'express'
import cors from 'cors'
import Error from '@Utils/errorHandler'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import hpp from 'hpp'
import xss from 'xss-clean'
import 'express-async-errors'

//routes
import AuthRouter from '@Routes/authRoute'

const app = express()

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
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

app.use(
  cors({
    origin: ['*'],
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
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
app.use('/api/v1', AuthRouter)

//if no api url matched this api fires
app.all('*', (req) => {
  throw `Can't find ${req.originalUrl} on this server!`
})

//middleware for error
app.use(Error)

export default app
