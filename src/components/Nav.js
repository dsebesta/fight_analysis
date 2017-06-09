import React from 'react';
import {Link} from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Route, Switch} from 'react-router-dom';


import Matchup from './Matchup';
import Event from './Event';


const Nav = () => {
    return (
        <div>
            <div className="nav-bar">
                <i className="material-icons">menu</i>
                <h3><Link to="/fight">Fight Analyzer</Link></h3>
            </div>

            <Switch >
                <Route exact path="/events/:id" component={Event} />
                <Route exact path="/events/:id/:match" component={Matchup} />
            </Switch>
        </div>

    )
};

export default Nav;
