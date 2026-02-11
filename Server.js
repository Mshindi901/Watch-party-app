const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();

//routes
const authRoutes = require('./Src/Routes/auth.routes.js');
const roomRoutes = require('./Src/Routes/room.routes.js');
const participantRoutes = require('./Src/Routes/participant.routes.js');

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = http.createServer(app);
//Socket.io setup
const io = new Server(httpServer, {
    cors: {origin: '*',}
});

io.on('connection', (socket) => {
    console.log('A user connected to Socket Id: ', socket.id);

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });
});

socket.on('Play', (data) => {
    socket.to(data.roomId).emit('Play', data);
});

socket.on('Pause', (data) => {
    socket.to(data.roomId).emit('Pause', data);
});

socket.on('Seek', (data) => {
    socket.to(data.roomId).emit('Seek', data);
});

socket.on('disconnect', () => {
    console.log('A user disconnected from Socket Id: ', socket.id);
});

app.use('/auth', authRoutes);
app.use('/room', roomRoutes);
app.use('/participant', participantRoutes);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
