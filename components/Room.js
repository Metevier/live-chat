import React, { Component } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import RoomStore from '../stores/RoomStore';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';

import { addChat, initSocket } from '../actions/RoomActions';

class Room extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  componentWillMount() {
    console.log('d');
    this.props.context.executeAction(initSocket);
    console.log('here');
  }

  addChat(event) {
    event.preventDefault();
    this.props.context.executeAction(addChat, { message: this.state.message, roomId: this.props.roomId });
    this.setState({
      message: ''
    });
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    return (
      <Box pad='medium'>
        <div>{this.props.roomId}</div>
        {this.props.chats.map(chat => {
          return <div>{chat.message}</div>
        })}
        <Form pad='medium' onSubmit={this.addChat.bind(this)}>
            <TextInput id='message'
                name='message'
                value={this.state.message}
                onDOMChange={this.updateMessage.bind(this)} />
          </Form>
      </Box>
    );
  }
}

export default connectToStores(
  Room,
  [RoomStore],
  (context, props) => {
    let { roomId, chats, users } = context.getStore(RoomStore).getState();
    return {
      roomId,
      chats,
      users
    };
  }
);