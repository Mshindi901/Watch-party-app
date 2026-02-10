const express = require('express');
const { NewRoom, AddVideo, UpdateRoom, DeleteRoom, SearchRoomByCode } = require('../Controllers/room.controller.js');
const AuthMiddleware = require('../Middleware/auth.js');
const router = express.Router();

router.post('/create', AuthMiddleware, NewRoom);
router.post('/addvideo', AuthMiddleware, AddVideo);
router.put('/update', AuthMiddleware, UpdateRoom);
router.delete('/delete/:roomcode', DeleteRoom);
router.get('/search/:roomcode', SearchRoomByCode);

module.exports = router;