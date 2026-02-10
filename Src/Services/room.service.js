const crypto = require('crypto');
module.exports = class RoomService {
    constructor(roomRepo) {
        this.roomRepo = roomRepo;
    };

    async createRoom(roomData) {
        try {
            const { hostId, videoUrl, currentTime, isplaying} = roomData;
            if (!hostId) {
                return { success: false, message: 'Host ID is required' };
            };
            const roomcode = crypto.randomBytes(4).toString('hex');
            const existingRoom = await this.roomRepo.findRoomByCode(roomcode);
            if (existingRoom) {
                return { success: false, message: 'Room code already exists' };
            };
            const room = await this.roomRepo.createRoom({ roomcode, hostId, videoUrl, currentTime, isplaying, isActive: true });
            return { success: true, data: room};
        } catch (error) {
            console.error('Error creating room:', error.message);
            return { success: false, message: 'Failed to create room' };
        };
    };

    async addingvideo(data) {
        try {
            const { hostId, videoUrl } = data;
            if (!hostId || !videoUrl) {
                return { success: false, message: 'Host ID and video URL are required' };
            };
            const room = await this.roomRepo.addingvideo(hostId, videoUrl);
            if (!room) {
                return { success: false, message: 'Room not found' };
            };
            return { success: true, data: room };
        } catch (error) {
            console.error('Error adding video:', error.message);
            return { success: false, message: 'Failed to add video' };
        };
    };

    async updateRoom(hostId, updateData) {
        try {
            const { currentTime, isplaying, isActive } = updateData;
            if (!hostId) {
                return { success: false, message: 'Host ID is required' };
            };
            const room = await this.roomRepo.updateRoom(hostId, updateData);
            if (!room) {
                return { success: false, message: 'Room not found or inactive' };
            };
            return { success: true, data: room };
        } catch (error) {
            console.error('Error updating room:', error.message);
            return { success: false, message: 'Failed to update room' };
        };
    };

    async deleteRoom(roomcode) {
        try {
            if (!roomcode) {
                return { success: false, message: 'Room code is required' };
            };
            const result = await this.roomRepo.deleteRoom(roomcode);
            if(!result) {
                return { success: false, message: 'Room not found' };
            };
            return { success: true, message: 'Room deleted successfully' };
        } catch (error) {
            console.error('Error deleting room:', error.message);
            return { success: false, message: 'Failed to delete room' };
        };
    };

    async getRoomByCode(roomcode) {
        try {
            const room = await this.roomRepo.findRoomByCode(roomcode);
            if (!room) {
                return { success: false, message: 'Room not found' };
            };
            return { success: true, data: room };
        } catch (error) {
            console.error('Error fetching room by code:', error.message);
            return { success: false, message: 'Failed to fetch room by code' };
        };
    };
};