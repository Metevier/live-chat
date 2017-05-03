/*globals document*/

import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import pages from '../configs/routes';

import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';

class Application extends React.Component {
  render() {
    var Handler = this.props.currentRoute.handler;
    return (
      <Box>
        <Header justify='center' colorIndex='neutral-4'>
          <Title>
            Screenshare Chat
          </Title>
        </Header>
        <Handler context={this.props.context}/>
      </Box>
    );
  }

  componentDidMount() {
    require('grommet/scss/vanilla/index.scss');
  }

  componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;
    if (newProps.pageTitle === prevProps.pageTitle) {
      return;
    }
    document.title = newProps.pageTitle;
  }
}

export default provideContext(handleHistory(connectToStores(
  Application,
  [ApplicationStore],
  function (context, props) {
    var appStore = context.getStore(ApplicationStore);
    return {
      pageTitle: appStore.getPageTitle()
    };
  }
)));
