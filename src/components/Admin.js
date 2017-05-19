import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {fetchFighters} from './../actions';

class Admin extends Component {

    handleFetchFighters() {
        console.log('fetch fighters clicked');
        this.props.fetchFighters();
    }

    handleSQLImport() {
        console.log('going to import some data!');
        this.props.sqlImport();
    }

    render() {
        return (
                <div>
                    <RaisedButton label="Import Data" onTouchTap={this.props.handleSQLImport.bind(this)} />
                    <RaisedButton label="Fetch Fighters" onTouchTap={this.handleFetchFighters.bind(this)} primary={true} />
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fighterData: state.fighters
    }
}

export default connect(mapStateToProps, {fetchFighters})(Admin);