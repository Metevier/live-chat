import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Columns from 'grommet/components/Columns';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Label from 'grommet/components/Label';
import Layer from 'grommet/components/Layer';
import Section from 'grommet/components/Section';
import TextInput from 'grommet/components/TextInput';

class NewRoomDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenName: ''
    };
  }

  startNewRoom(event) {
    event.preventDefault();
  }

  updateScreenName(event) {
    this.setState({
      screenName: event.target.value
    });
  }

  render() {
    return (
      <Layer closer={true} flush={true} onClose={this.props.closeDialog}>
        <Box pad='medium'>
          <Form pad='medium'>
            <Label labelFor='screenName'>Screen Name</Label>
            <FormField>          
              <TextInput id='screenName'
                name='screen-name'
                value={this.state.screenName}
                onDOMChange={this.updateScreenName.bind(this)} />
            </FormField>
            <Box pad={{vertical: 'small'}}>
              <Button label='Start Chatroom' type='submit' onClick={this.startNewRoom.bind(this)} fill={true} accent={true} />
            </Box>
          </Form>
        </Box>
      </Layer>
    )
  }
}

class JoinRoomDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenName: '',
      joinId: ''
    };
  }

  joinRoom(event) {
    event.preventDefault();
  }

  updateScreenName(event) {
    this.setState({
      screenName: event.target.value
    });
  }

  updateJoinId(event) {
    this.setState({
      joinId: event.target.value
    });
  }

  render() {
    return (
      <Layer closer={true} flush={true} onClose={this.props.closeDialog}>
        <Box pad='medium'>
          <Form pad='medium'>
            <Label labelFor='screenName'>Screen Name</Label>
            <FormField>          
              <TextInput id='screenName'
                name='screen-name'
                value={this.state.screenName}
                onDOMChange={this.updateScreenName.bind(this)} />
            </FormField>
            <Label labelFor='joinId'>Join ID</Label>
            <FormField>          
              <TextInput id='joinId'
                name='join-id'
                value={this.state.joinId}
                onDOMChange={this.updateJoinId.bind(this)} />
            </FormField>
            <Box pad={{vertical: 'small'}}>
              <Button label='Join Chatroom' type='submit' onClick={this.joinRoom.bind(this)} fill={true} accent={true} />
            </Box>
          </Form>
        </Box>
      </Layer>
    )
  }
}

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shouldShowNewRoomDialog: false,
      shouldShowJoinRoomDialog: false
    };
  }

  showNewRoomDialog() {
    this.setState({
      shouldShowNewRoomDialog: true,
      shouldShowJoinRoomDialog: false
    });
  }

  showJoinRoomDialog() {
    this.setState({
      shouldShowNewRoomDialog: false,
      shouldShowJoinRoomDialog: true
    });
  }

  closeDialog() {
    this.setState({
      shouldShowNewRoomDialog: false,
      shouldShowJoinRoomDialog: false
    });
  }

  render() {
    return (
      <Box pad='medium'>
        <Columns size='large' masonry={false} justify='center' maxCount={2}>
          <Box pad='medium'>
            <Button onClick={this.showNewRoomDialog.bind(this)} plain={true}>
              <Box pad='large' colorIndex='neutral-1'>
                <Label align='center'>Start a Chatroom</Label>
              </Box>
            </Button>
          </Box>
          <Box pad='medium'>
            <Button onClick={this.showJoinRoomDialog.bind(this)} plain={true}>
              <Box pad='large' colorIndex='neutral-1'>
                <Label align='center'>Join a Chatroom</Label>
              </Box>
            </Button>
          </Box>
        </Columns>
        {this.state.shouldShowNewRoomDialog ? <NewRoomDialog closeDialog={this.closeDialog.bind(this)} /> : null}
        {this.state.shouldShowJoinRoomDialog ? <JoinRoomDialog closeDialog={this.closeDialog.bind(this)} /> : null}
      </Box>
    );
  }
}