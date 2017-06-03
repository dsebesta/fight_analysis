import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store, {history} from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

 //Components
import Events from './Events';
import Event from './Event';
import GetStarted from './GetStarted';
import Find from './Find';
import Nav from './Nav';
import Login from './Login';
import Admin from './Admin';
import Matchup from './Matchup';
import Fighter from './Fighter';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store} >
                    <Router history={history}>
                        <div className='container'>
                            <Nav />
                            <Switch >
                                <Route exact path="/" component={Events} />
                                <Route exact path="/events/:id" component={Event} />
                                <Route exact path="/events/:id/:match" component={Matchup} />
                                <Route exact path="/fighter/:id" component={Fighter} />
                                <Route path="/get_started" component={GetStarted} />
                                <Route path="/find" component={Find} />
                                <Route path="/login" component={Login} />
                                <Route path="/admin" component={Admin} />
                                <Route render={() => {
                                    return <p>Not Found</p>
                                    }}
                                />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}

export default App;