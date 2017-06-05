import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Link} from 'react-router-dom';

const tableStyle = {
    column: {
        textAlign: "center",
        height: "20px"
    },
    columnHdr: {
        textAlign: "right",
        height: "25px"
    },
    row: {
        height: "20px"
    }
};

const GeneralStats = (props) => {

    props.fighter_0.ip = 'In Progress';
    props.fighter_1.ip = 'In Progress';
    const route_0 = '/fighter/' + (props.fighter_0.fighter_id);
    const route_1 = '/fighter/' + (props.fighter_1.fighter_id);

    return (
        <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow style={tableStyle.row}>
                    <TableHeaderColumn style={tableStyle.column}></TableHeaderColumn>
                    <TableHeaderColumn style={tableStyle.column}><Link to={route_0}><span className="fighter-hdr">{props.fighter_0.fighter_name}</span></Link></TableHeaderColumn>
                    <TableHeaderColumn style={tableStyle.column}><Link to={route_1}><span className="fighter-hdr">{props.fighter_1.fighter_name}</span></Link></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Height</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.height}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.height}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Reach</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Leg Reach</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Win</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.wins}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.wins}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Loss</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.losses}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.losses}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Draw</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.draw}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.draw}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>No Contest</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.no_contest}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.no_contest}</TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>
    )
};

export default GeneralStats;