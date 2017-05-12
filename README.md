# Live Chat

### [Demo](https://live-chat-lookback.herokuapp.com)

### Local Installation

After cloning the repo:

```bash
npm install
npm run dev
```
Then browse to ```http://localhost:3000```

### Purpose

To showcase some of my skills using React, Node, socket.io and more.

### Notable Libraries Used

#### Fluxible

A familiar technology I have used in the past to quickly prototype full stack applications. It uses the Flux architecture, which is a common one-way data pattern used in many React apps. Fluxible provides isomporphic server-side React rendering, built in routing, a framework around a CRUD API, Redux like store management, and asynchronous actions to hook it all together. 

This applicaiton was scaffolded with fluxible's boilerplate. This included webpack and everything needed to get started with server-side rendered React app. Some negatives to this however, is that it has not been updated recently and does not use webpack 2 or React 16, nor is the Fluxible package itself using React 16, so there are a few minor warnings when using React 16.  

#### Grommet

Grommet is a very powerful UI library, shipping with React components that look great out of the box. I had never used Grommet before, but overall it was easy enough to get started with.

### Design Decisions

##### User and Chat Management

Since I was not using a data store, I used a singleton to manage chat rooms, chats, and users. In a real world application, this would of course be done by persisting all of these items. 

When It came to managing unique users, I set a cookie with the userId and used that when joining a chat room. This allows users to be able to reload the page and join multiple chat rooms without dissociating the chats from that specific user. In production we would want this cookie secured, instead of leaving it in plain text.