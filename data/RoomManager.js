import Room from './Room';

class RoomManager {
  constructor() {
    this._rooms = {};
  }

  createNewRoom() {
    let roomId = this._getRandomString(8);
    this._rooms[roomId] = new Room(roomId);
    return roomId;
  }

  getRoom(roomId) {
    return this._rooms[roomId];
  }

  isValidRoom(roomId) {
    return !!this._rooms[roomId];
  }

  addUserToRoom(roomId, screenName, userId) {
    let room = this.getRoom(roomId);
    userId = userId || this._getRandomString(8); 
    room.addUser(screenName, userId);
    return userId;
  }


  //http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
  _getRandomString(length) {
     return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }
}

const manager = new RoomManager();
Object.freeze(manager);

export default manager;
