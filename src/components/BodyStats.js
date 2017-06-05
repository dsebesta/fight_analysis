import React from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

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

const BodyStats = (props) => {

    props.fighter_0.ip = 'In Progress';
    props.fighter_1.ip = 'In Progress';
    return (
        <Table>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>MMA Career Length</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.years_mma_career} Years</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.years_mma_career} Years</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Total MMA Rounds</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.mma_rounds}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.mma_rounds}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Average Rounds / Year</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.year_avg_rounds}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.year_avg_rounds}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>KO Losses</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.losses_ko}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.losses_ko}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Submission Losses</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.losses_sub}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.losses_sub}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Days Since Last KO Loss</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Days Since Last Submission Loss</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>
    )
};

export default BodyStats;