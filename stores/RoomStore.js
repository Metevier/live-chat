import BaseStore from 'fluxible/addons/BaseStore';

class RoomStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.roomId = '';
    this.chats = [];
    this.users = {};
  }

  updateRoomId({ roomId }) {
    this.roomId = roomId;
    this.emitChange();
  }

  updateChats({ chats }) {
    this.chats = chats;
    this.emitChange();
  }

  updateUsers({ users }) {
    this.users = users;
    this.emitChange();
  }

  getState() {
    return {
      roomId: this.roomId,
      chats: this.chats,
      users: this.users
    };
  }

  dehydrate() {
    return this.getState();
  }

  rehydrate(state) {
    this.roomId = state.roomId;
    this.chats = state.chats;
    this.users = state.users;
  }
}

RoomStore.storeName = 'RoomStore';
RoomStore.handlers = {
  'UPDATE_ROOM_ID': 'updateRoomId',
  'UPDATE_CHATS': 'updateChats',
  'UPDATE_USERS': 'updateUsers',
};

export default RoomStore;