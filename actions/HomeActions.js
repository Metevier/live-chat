import { navigateAction } from 'fluxible-router';

export function joinRoom(context, { roomId, screenName }, done) {
  let currentUserId = context.getCookie('userId');
  context.service.update('room', { roomId, screenName, currentUserId }, {}, (err, { isValidRoom, userId }) => {
    if (isValidRoom) {
      context.setCookie('userId', userId);
      context.dispatch('UPDATE_ROOM_ID', { roomId });
      context.executeAction(navigateAction, { method: 'get', routeName: 'room', params: { roomId } }, (err) => {
        done(err);
      });
    } else {
      done(err);
    }
  });
};

export function startNewRoom(context, { screenName }, done) {
  let currentUserId = context.getCookie('userId');
  context.service.create('room', { screenName, currentUserId }, {}, (err, { roomId, userId }) => {
    context.setCookie('userId', userId);
    context.dispatch('UPDATE_ROOM_ID', { roomId });
    context.executeAction(navigateAction, { method: 'get', routeName: 'room', params: { roomId } }, (err) => {
      done(err);
    });
  });
};

export function isValidRoomAndUser(context, { params }, done) {
  let roomId = params.roomId;
  let userId = context.getCookie('userId');

  const navigateHome = () => context.executeAction(navigateAction, { method: 'get', routeName: 'home' }, (err) => {
      done(err);
  });

  if (userId) {
    context.service.read('room', { userId, roomId }, {}, (err, { isValid }) => {
      if (isValid) {
        context.dispatch('UPDATE_ROOM_ID', { roomId });
        done(err);
      } else {
        navigateHome();
      }
    });
  } else {
    navigateHome();
  }
}