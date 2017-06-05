import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchEventsAll} from './../actions';
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
        this.props.fetchEventsAll();
    }

    handleClick(route) {
        this.props.history.push(route)
    }

    renderEvents() {
        return this.props.events.map((event, index) => {
            const route = '/events/ufc' + (event.event_id);

            return (
                <TableRow key={index} style={tableStyle.row} onTouchTap={this.handleClick.bind(this, route)}>
                    <TableRowColumn style={tableStyle.column}> {event.event_date} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {event.title} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {event.venue} </TableRowColumn>
                </TableRow>
            )
        });
    }

    render() {

        if (!this.props.events) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div className="home-container">
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow style={tableStyle.row}>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Date</TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Title</TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Location</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {this.renderEvents()}
                    </TableBody>
                </Table>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        events: state.eventProps.events
    }
}

export default connect(mapStateToProps, {fetchEventsAll}) (Events);