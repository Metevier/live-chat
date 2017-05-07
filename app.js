import Fluxible from 'fluxible';
import cookiePlugin from 'fluxible-plugin-cookie';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RoomStore from './stores/RoomStore';
import RouteStore from './stores/RouteStore';

// create new fluxible instance
const app = new Fluxible({
  component: Application
});

app.plug(cookiePlugin());

app.plug(fetchrPlugin({
    xhrPath: '/api' // Path for XHR to be served from
}));

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(RoomStore);

module.exports = app;
