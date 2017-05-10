import React, { Component } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import RoomStore from '../stores/RoomStore';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import Label from 'grommet/components/Label';
import Split from 'grommet/components/Split';
import TextInput from 'grommet/components/TextInput';
import Title from 'grommet/components/Title';

import { addChat, destroySocket, initSocket } from '../actions/RoomActions';

class Room extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    require('./Room.scss');
    this.props.context.executeAction(initSocket, { roomId: this.props.roomId });
  }

  componentWillUnmount() {
    this.props.context.executeAction(destroySocket);
  }

  componentDidUpdate() {
    let element = this.chatWindow.boxContainerRef; //Have to get the element from the grommet wrapper
    let atBottom = (element.scrollHeight - element.clientHeight) <= (element.scrollTop + 1);
    console.log(element, atBottom)
    if(!atBottom) {

    }
      element.scrollTop = element.scrollHeight - element.clientHeight;
  }

  addChat(event) {
    event.preventDefault();
    if (this.state.message === '') return;
    
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
      <Split separator={false} flex='right'>
        <Box colorIndex='neutral-2'
          justify='start'
          align='start'
          pad={{ horizontal: 'medium' }}
          className='full-height' >
          <Box pad='medium' >
            <Title>Online Users</Title>
            {Object.keys(this.props.users).map((key, index) => {
              return <Box pad='small' justify='start' key={index}>{this.props.users[key]}</Box>
            })}
          </Box>
        </Box>
        <Box justify='start'
          size='full'
          className='full-height'>
          <Box pad='medium'>
            <Title>{'Room ID: ' + this.props.roomId}</Title>
          </Box>
          <Box justify='start' size='full' pad='medium' className='chat-window' ref={chatWindow => this.chatWindow = chatWindow}>
            <Box>
              {this.props.chats.map((chat, index) => {
                return (
                  <Box key={index} className='chat-entry'>
                    <Label margin='none'>{chat.screenName}</Label>
                    <Box>{chat.message}</Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
          <Box pad={{ vertical: 'medium' }}>
            <Form pad={{ horizontal: 'medium' }} onSubmit={this.addChat.bind(this)} plain={true}>
              <TextInput id='message'
                name='message'
                fill={true}
                placeHolder='Enter your chat'
                value={this.state.message}
                onDOMChange={this.updateMessage.bind(this)} 
                className='chat-input' />
            </Form>
          </Box>
        </Box>
      </Split>
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