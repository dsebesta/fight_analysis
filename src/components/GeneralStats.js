import React from 'react';
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

    return (
        <div className="matchup-stats-container">
            <div className="matchup-stats-table">
                <span>Height</span>
                <div>{props.fighter_0.height}</div>
                <div>{props.fighter_1.height}</div>
                <span>Reach</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
                <span>Leg Reach</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
                <span>Win</span>
                <div>{props.fighter_0.wins}</div>
                <div>{props.fighter_1.wins}</div>
                <span>Loss</span>
                <div>{props.fighter_0.losses}</div>
                <div>{props.fighter_1.losses}</div>
                <span>Draw</span>
                <div>{props.fighter_0.draw}</div>
                <div>{props.fighter_1.draw}</div>
                <span>No Contest</span>
                <div>{props.fighter_0.no_contest}</div>
                <div>{props.fighter_1.no_contest}</div>
            </div>
        </div>
    )
};

export default GeneralStats;