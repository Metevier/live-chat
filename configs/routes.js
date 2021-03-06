import Home from '../components/Home';
import Room from '../components/Room';

import { isValidRoomAndUser } from '../actions/HomeActions';

export default {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    title: 'Home',
    handler: Home
  },
  room: {
    path: '/room/:roomId',
    method: 'get',
    page: 'room',
    title: 'Chat Room',
    handler: Room,
    action: isValidRoomAndUser
  }
};
