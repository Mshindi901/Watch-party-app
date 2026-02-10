const participantRepo = require('../Repositories/participants.repository.js');
const ParticipantsService = require('../Services/participant.service.js');
const {Participants} = require('../../models/index.js');

const participantRepository = new participantRepo(Participants);
const participantService = new ParticipantsService(participantRepository);

async function AddingRoomParticipants(req, res) {
    try {
        const  { roomId }  = req.params;
        const userId = req.user.id;
        const result = await participantService.addingRoomParticipants(roomId, userId);
        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'Participant added to the room successfully',
                participant: result.participant
            });
        } else {
            res.status(400).json({success: false, message: 'Failed to add participant to the room'});
        };
    } catch (error) {
        console.error('Error Adding Room Participants:', error.message);
        res.status(500).json({success: false, message: 'Failed to add participant to the room'});
    }
};

async function GetRoomParticipants(req, res) {
    try {
        const { roomId } = req.params;
        const result = await participantService.getRoomParticipants(roomId);
        if (result.success) {
            res.status(200).json({
                success: true,
                participants: result.participants
            });
        } else {
            res.status(404).json({success: false, message: 'No participants found for the room'});
        };
    } catch (error) {
        console.error('Error Getting Room Participants:', error.message);
        res.status(500).json({success: false, message: 'Failed to get participants of the room'});
    }
};

async function RemoveRoomParticipants(req, res) {
    try {
        const { roomId } = req.params;
        const userId = req.user.id;

        const result = await participantService.removeRoomParticipants(roomId, userId);
        if (result.success) {
            res.status(200).json({success: true, message: result.message || 'Participant removed from the room successfully'});
        } else {
            res.status(404).json({success: false, message: result.message || 'Participant not found in the room'});
        };
    } catch (error) {
        console.error('Error Removing Room Participants:', error.message);
        res.status(500).json({success: false, message: 'Failed to remove participant from the room'});
    }
};

module.exports = {
    AddingRoomParticipants,
    GetRoomParticipants,
    RemoveRoomParticipants
};