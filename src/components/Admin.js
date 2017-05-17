import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Admin extends Component {

    handleClick() {
        console.log('import clicked')
    }

    render() {
        return (
                <div>
                    <RaisedButton>
                        Import Data
                    </RaisedButton>
                </div>
        )
    }
}

export default Admin;