import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {sqlImport} from './../actions';

class Admin extends Component {

    handleSQLImport() {
        console.log('going to import some data!');
        this.props.sqlImport();
    }

    render() {
        return (
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h1>Let's Import Some Data</h1>
                    </div>
                    <div className="row justify-content-md-center">
                        <RaisedButton label="Import Data" onTouchTap={this.handleSQLImport.bind(this)} />
                    </div>


                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fighterData: state.fighters
    }
}

export default connect(mapStateToProps, {sqlImport})(Admin);