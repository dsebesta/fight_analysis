import React from 'react';
import {Link} from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';


const Nav = () => {
    return (
        <Toolbar>
            <ToolbarGroup>
                <Link to='/'>
                    Fight Analyzer
                </Link>
            </ToolbarGroup>
            <ToolbarGroup>
                <RaisedButton>
                    <Link to='/events'>
                        Events
                    </Link>
                </RaisedButton>
                <Link to='/login'>
                    Login
                </Link>
            </ToolbarGroup>
        </Toolbar>
    )
};

export default Nav;
