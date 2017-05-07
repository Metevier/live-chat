import socketClient from 'socket.io-client';
var socket = null;

export function initSocket(context, payload, done) {
  socket = socketClient();
  socket.on('update-chats', ({ chats }) => {
    context.dispatch('UPDATE_CHATS', { chats });
  });
  done();
}

export function addChat(context, { message, roomId }, done) {
  let userId = context.getCookie('userId');
  socket.emit('add-chat', { message, userId, roomId });
  done();
};