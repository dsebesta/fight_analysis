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
                {/*<Link to='/events'>*/}
                    {/*<RaisedButton>*/}
                        {/*Events*/}
                    {/*</RaisedButton>*/}
                {/*</Link>*/}
                {/*<Link to='/login'>*/}
                    {/*<RaisedButton>*/}
                        {/*Login*/}
                    {/*</RaisedButton>*/}
                {/*</Link>*/}
                <Link to='/admin'>
                    <RaisedButton>
                        Admin
                    </RaisedButton>
                </Link>
            </ToolbarGroup>
        </Toolbar>
    )
};

export default Nav;
