import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middleware/errorHandler.js'
import motorcycleRoutes from "./routes/motorcycle.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// Database connection
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/motorcycles', motorcycleRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/chat', chatRoutes)

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling middleware
app.use(errorHandler)

export default app
