import socketClient from 'socket.io-client';
var socket = null;

export function initSocket(context, { roomId }, done) {
  let userId = context.getCookie('userId');
  socket = socketClient({forceNew: true});
  socket.on('update-chats', ({ chats }) => {
    context.dispatch('UPDATE_CHATS', { chats });
  });
  socket.on('update-users', ({ users }) => {
    context.dispatch('UPDATE_USERS', { users });
  });
  socket.emit('user-joined', { userId, roomId });
  done();
}

export function destroySocket(context, { roomId }, done) {
  socket.disconnect();
}

export function addChat(context, { message, roomId }, done) {
  let userId = context.getCookie('userId');
  socket.emit('add-chat', { message, userId, roomId });
  done();
};