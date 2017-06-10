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

const ComparisonStats = (props) => {

    props.fighter_0.ip = 'In Progress';
    props.fighter_1.ip = 'In Progress';

    return (
        <div className="matchup-stats-container">
            <div className="matchup-stats-table">
                <span>at Similar Elevation</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
                <span>vs Similar Height Opponents</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
                <span>vs Similar Reach Opponents</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
                <span>vs Same Opponents</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
                <span>Typically Wins By</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
                <span>Typically Loses By</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
            </div>
        </div>
    )
};

export default ComparisonStats;