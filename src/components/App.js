import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store, {history} from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Nav from './Nav';


injectTapEventPlugin();

 //Components
import Events from './Events';
import GetStarted from './GetStarted';
import Find from './Find';

import Login from './Login';
import Admin from './Admin';
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
                        <div>
                            <Switch >
                                <Route exact path="/fight" component={Events} />
                                <Route path="/events" component={Nav} />
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