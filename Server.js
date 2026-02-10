const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//routes
const authRoutes = require('./Src/Routes/auth.routes.js');
const roomRoutes = require('./Src/Routes/room.routes.js');
const participantRoutes = require('./Src/Routes/participant.routes.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/room', roomRoutes);
app.use('/participant', participantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
