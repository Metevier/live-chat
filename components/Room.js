import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';

import { addChat } from '../actions/ChatActions';

export default class Room extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  addChat(event) {
    event.preventDefault();
    this.props.context.executeAction(addChat, { message: this.state.message });
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