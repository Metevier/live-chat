import RoomManager from '../data/RoomManager';

export default {
  name: 'room',
  read: function (req, resource, { roomId, userId }, config, callback) {
    let isValidRoom = RoomManager.isValidRoom(roomId);
    let isValidUser;
    if (isValidRoom) {
      let room = RoomManager.getRoom(roomId);
      isValidUser = room.isValidUser(userId);
    }
    let isValid = isValidRoom && isValidUser;
    callback(null, { isValid });
  },
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