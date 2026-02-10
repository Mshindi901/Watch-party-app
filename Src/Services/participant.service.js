module.exports = class ParticipantsService {
    constructor(partcipantRepository){
        this.partcipantRepository = partcipantRepository;
    };

    async addingRoomParticipants(roomId, userId){
        try {
            const participant = await this.partcipantRepository.addingRoomParticipants(roomId, userId);
            return {success: true, participant};
        } catch (error) {
            console.error('Error Adding Room Participants:', error.message);
            return{success: false, message: 'Failed to add participant to the room'}
        };
    };

    async getRoomParticipants(roomId){
        try {
            const participants = await this.partcipantRepository.getRoomParticipants(roomId);
            return {success: true, participants};
        } catch (error) {
            console.error('Error Getting Room Participants:', error.message);
            return{success: false, message: 'Failed to get participants of the room'}
        };
    };

    async removeRoomParticipants(roomId, userId){
        try {
            const participant = await this.partcipantRepository.removeRoomParticipants(roomId, userId);
            if (participant) {
                return {success: true, message: 'Participant removed from the room successfully'};
            } else {
                return {success: false, message: 'Participant not found in the room'};
            }
            return {success: true, participant};
        } catch (error) {
            console.error('Error Removing Room Participants:', error.message);
            return{success: false, message: 'Failed to remove participant from the room'}  
        };
    };
};