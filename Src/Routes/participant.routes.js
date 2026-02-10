const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../Middleware/auth.js');

const { AddingRoomParticipants, GetRoomParticipants, RemoveRoomParticipants } = require('../Controllers/participant.controller.js');

router.post('/rooms/:roomId/participants', AuthMiddleware, AddingRoomParticipants);
router.get('/rooms/:roomId/participants', GetRoomParticipants);
router.delete('/rooms/:roomId/participants', AuthMiddleware, RemoveRoomParticipants);  

module.exports = router;