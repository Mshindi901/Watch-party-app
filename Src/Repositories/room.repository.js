module.exports = class RoomRepo {
    constructor(roomModel) {
        this.Room = roomModel;
    };

    async createRoom({ roomcode, hostId, videoUrl, currentTime, isplaying, isActive }) {
        const room = await this.Room.create({
            roomcode,
            hostId,
            videoUrl,
            currentTime,
            isplaying,
            isActive
        });
        return room;
    };

    async findRoomByCode(roomcode) {
        const room = await this.Room.findOne({ where: { roomcode } });
        return room;
    };
    async findRoomByHostId(hostId) {
        const room = await this.Room.findOne({ where: { hostId, isActive: true } });
        return room;
    }
    async addingvideo(hostId, videoUrl) {
        const room = await this.Room.findOne({ where: { hostId, isActive: true } });
        if (room) {
            room.videoUrl = videoUrl;
            await room.save();
        }        return room;
    };

    async updateRoom(hostId, { currentTime, isplaying, isActive }) {
        const room = await this.Room.findOne({ where: { hostId, isActive: true } });
        if (room) {
            room.currentTime = currentTime;
            room.isplaying = isplaying;
            room.isActive = isActive;
            await room.save();
        }
        return room;
    };

    async deleteRoom(roomcode) {
        const result = await this.Room.destroy({ where: { roomcode } });
        return result;
    }
};