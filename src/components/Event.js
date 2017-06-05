import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchEvent} from './../actions';
import {Link} from 'react-router-dom';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const tableStyle = {
    column: {
        textAlign: "center",
        height: "20px"
    },
    columnHdr: {
        textAlign: "center",
        height: "25px"
    },
    row: {
        height: "20px"
    }
};

class Events extends Component {

    componentWillMount() {
        const path = document.location.href;
        const pathIndex = path.indexOf('ufc');
        this.props.fetchEvent(path.substring(pathIndex+3));
    }



    renderMatchups() {
        const {event} = this.props;
        return event.map((fight, index) => {

            const fNames = fight.fighter_name.split(',');
            const route = '/events/ufc' + fight.event_id + '/' + fight.match_id;

            return (
                <TableRow key={index} style={tableStyle.row} onTouchTap={this.handleClick.bind(this, route)}>
                    <TableRowColumn style={tableStyle.column} className="text-right"> {fNames[0]} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column} className="text-center"> vs. </TableRowColumn>
                    <TableRowColumn style={tableStyle.column} className="text-left"> {fNames[1]} </TableRowColumn>
                </TableRow>
            )
        })
    }

    handleClick(route) {
        this.props.history.push(route)
    }

    render() {

        if (!this.props.event) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div className="home-container">
                <h1 className="text-center">{this.props.event[0].title}</h1>
                <div>
                    <Table>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            {this.renderMatchups()}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        event: state.eventProps.event
    }
}

export default connect(mapStateToProps, {fetchEvent}) (Events);