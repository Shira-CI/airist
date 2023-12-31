import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve( 'public')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://localhost:5173',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}
// routes
import { authRoutes } from './api/auth/auth.routes.mjs'
import { userRoutes } from './api/user/user.routes.mjs'
import { reviewRoutes } from './api/review/review.routes.mjs'
import { stayRoutes } from './api/stay/stay.routes.mjs'
import { setupSocketAPI } from './services/socket.service.mjs'
import { orderRoutes } from './api/order/order.routes.mjs'
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.mjs'
import { logger } from './services/logger.service.mjs'

app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/order', orderRoutes)
app.use('/api', stayRoutes)

// console.log('server')
setupSocketAPI(server)

const port = process.env.PORT || 3030


app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})


server.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})