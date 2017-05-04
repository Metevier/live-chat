import { navigateAction } from 'fluxible-router';

export function joinRoom(context, { roomId, screenName }, done) {
  let currentUserId = context.getCookie('userId');
  context.service.update('room', { roomId, screenName, currentUserId }, {}, (err, { isValidRoom, userId }) => {
    if (isValidRoom) {
      context.setCookie('userId', userId);
      context.executeAction(navigateAction, { method: 'get', routeName: 'room', params: { roomId } }, () => {
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
    context.executeAction(navigateAction, { method: 'get', routeName: 'room', params: { roomId } }, () => {
      done(err);
    });
  });
};