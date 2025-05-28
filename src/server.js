import app from './app.js'
import dotenv from 'dotenv'
import * as http from "node:http";
import {Server} from "socket.io";
import registerChatHandlers from "./socket.js";
import {authenticateSocket} from "./middleware/socket.middleware.js";

dotenv.config()

const PORT = process.env.PORT || 3001

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.use(authenticateSocket);

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)
    registerChatHandlers(io, socket)

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`)
    })
})

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
