import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Error from '@Middleware/error'
import ErrorHandler from '@Utils/errorHandler'

//routes
import UserRouter from '@Routes/userRoute'

const app = express()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cookieParser())

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
