export default class Room {
  constructor(id) {
    this.id = id;
    this.users = {};
    this.chats = [];
  }

  addUser(screenName, userId) {
    this.users[userId] = screenName;
  }

  isValidUser(userId) { 
    return !!this.users[userId];
  }
  
  getUsers() {
    return this.users;
  }

  addChat(userId, message) {
    let chat = {
      userId,
      message,
      screenName: this.getUsers[userId],
      date: new Date()
    };
    this.chats.push(chat);
  }

  getChats() {
    return this.chats;
  }
}