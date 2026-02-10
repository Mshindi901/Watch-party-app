module.exports = class ParticipantsRepository {
    constructor (participantModel){
        this.Participant = participantModel
    };

    async addingRoomParticipants(roomId, userId){
        const participant = await this.Participant.create({roomId, userId, joinedAt: new Date()});
        return participant;
    };

    async getRoomParticipants(roomId){
        const participants = await this.Participant.findAll({where: {roomId}});
        return participants;
    };

    async removeRoomParticipants(roomId, userId){
        const participant = await this.Participant.destroy({where: {roomId, userId}});
        return participant;
    }
};