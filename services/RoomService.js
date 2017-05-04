import RoomManager from '../api/RoomManager';

export default {
  name: 'room',

  create: function (req, resource, { screenName, currentUserId }, body, config, callback) {
    let roomId = RoomManager.createNewRoom();
    let userId = RoomManager.addUserToRoom(roomId, screenName, currentUserId);
    callback(null, { roomId, userId });
  },
  update: function (req, resource, { roomId, screenName, currentUserId }, body, config, callback) {
    let isValidRoom = RoomManager.isValidRoom(roomId);
    let userId;
    if (isValidRoom) {
      userId = RoomManager.addUserToRoom(roomId, screenName, currentUserId);
    }
    callback(null, { isValidRoom, userId });
  }
};