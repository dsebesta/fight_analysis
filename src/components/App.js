import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store, {history} from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

 //Components
import Home from './Home';
import Events from './Events';
import GetStarted from './GetStarted';
import Find from './Find';
import Nav from './Nav';
import Login from './Login';
import Admin from './Admin';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            test: [
                1, 2, 3
            ]
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store} >
                    <Router >
                        <div className='container'>
                            <Nav />
                            <Switch >
                                <Route exact path="/" component={Home} />
                                <Route path="/events" component={Events} />
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