const RoomRepository = require('../Repositories/room.repository.js');
const RoomServices = require('../Services/room.service.js');
const {Rooms} = require('../../models/index.js');

const roomRepository = new RoomRepository(Rooms);
const roomServices = new RoomServices(roomRepository);

async function NewRoom(req, res) {
    try {
        const hostId = req.user.id;
        const { videoUrl, currentTime, isplaying } = req.body;
        const result = await roomServices.createRoom({ hostId, videoUrl, currentTime, isplaying });
        res.status(201).json({
            success: result.success,
            message: result.message || 'Room created successfully',
            data: result.data || null
        });
    } catch (error) {
        console.error('Error creating room:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create room' });
    }
};

async function AddVideo(req, res) {
    try {
        const hostId = req.user.id;
        const { videoUrl } = req.body;
        const result = await roomServices.addingvideo({ hostId, videoUrl });
        res.status(200).json({
            success: result.success,
            message: result.message || 'Video added successfully',
            data: result.data || null
        });
    } catch (error) {
        console.error('Error adding video:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add video' });
    }
};

async function UpdateRoom(req, res) {
    try {
        const {currentTime, isplaying, isActive } = req.body;
        const hostId = req.user.id;
        const result = await roomServices.updateRoom(hostId, { currentTime, isplaying, isActive });
        res.status(200).json({
            success: result.success,
            message: result.message || 'Room updated successfully',
            data: result.data || null
        });
    } catch (error) {
        console.error('Error updating room:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update room' });
    }
};

async function DeleteRoom(req, res) {
    try {
        const { roomcode } = req.params;
        const result = await roomServices.deleteRoom(roomcode);
        res.status(200).json({
            success: result.success,
            message: result.message || 'Room deleted successfully',
            data: result.data || null
        });
    } catch (error) {
        console.error('Error deleting Room:', error.message);
        res.status(500).json({ success: false, message: 'Failed to delete room' });
    }
};

async function SearchRoomByCode(req, res) {
    try {
        const { roomcode } = req.params;
        const result = await roomServices.getRoomByCode(roomcode);
        res.status(200).json({
            success: result.success,
            message: result.message || 'Room found successfully',
            data: result.data || null
        });
    } catch (error) {
        console.error('Error searching room by code:', error.message);
        res.status(500).json({ success: false, message: 'Failed to search room by code' });
    }
};

module.exports = {NewRoom, AddVideo, UpdateRoom, DeleteRoom, SearchRoomByCode};