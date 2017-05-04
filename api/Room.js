export default class Room {
  constructor(id) {
    this.id = id;
    this.users = {};
  }

  addUser(screenName, userId) {
    this.users[userId] = screenName;
  }
}