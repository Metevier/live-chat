/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import { navigateAction } from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
import http from 'http';
import io from 'socket.io';
import RoomManager from './data/RoomManager';

//Services
import RoomService from './services/RoomService';

const env = process.env.NODE_ENV;

const debug = debugLib('live-chat');

const server = express();
server.use('/public', express['static'](path.join(__dirname, '/build')));
server.use(compression());
server.use(bodyParser.json());
server.use(cookieParser());

const fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(RoomService);

server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use((req, res, next) => {
  const context = app.createContext({ req, res });

  debug('Executing navigate action');
  context.getActionContext().executeAction(navigateAction, {
    url: req.url
  }, (err) => {
    if (err) {
      if (err.statusCode && err.statusCode === 404) {
        // Pass through to next middleware
        next();
      } else {
        next(err);
      }
      return;
    }

    debug('Exposing context state');
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    debug('Rendering Application component into html');
    const markup = ReactDOM.renderToString(createElementWithContext(context));
    const htmlElement = React.createElement(HtmlComponent, {
      clientFile: env === 'production' ? 'main.min.js' : 'main.js',
      context: context.getComponentContext(),
      state: exposed,
      markup: markup
    });
    const html = ReactDOM.renderToStaticMarkup(htmlElement);

    debug('Sending markup');
    res.type('html');
    res.write('<!DOCTYPE html>' + html);
    res.end();
  });
});

const httpServer = http.createServer(server)
const ioServer = io.listen(httpServer);

const port = process.env.PORT || 3000;
httpServer.listen(port);
console.log('Application listening on port ' + port);

ioServer.on('connection', (socket) => {

  socket.on('add-chat', ({ message, userId, roomId }) => {
    let room = RoomManager.getRoom(roomId);
    room.addChat(userId, message);
    ioServer.to(roomId).emit('update-chats', { chats: room.getChats() });
  });

  socket.on('user-joined', ({ userId, roomId }) => {
    let isValidRoom = RoomManager.isValidRoom(roomId);
    if (isValidRoom) {
      socket.join(roomId);
      let room = RoomManager.getRoom(roomId);
      let users = room.getUsers();
      ioServer.to(roomId).emit('update-users', { users });
      ioServer.to(roomId).emit('update-chats', { chats: room.getChats() });
    } 
  });
});


export default server;
