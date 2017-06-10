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

const MindStats = (props) => {
    return (
        <div className="matchup-stats-container">
            <div className="matchup-stats-table">
                <span>Days Since Last Fight</span>
                <div>{props.fighter_0.days_last_fight}</div>
                <div>{props.fighter_1.days_last_fight}</div>
                <span>Days Since Last Win</span>
                <div>{props.fighter_0.days_last_win}</div>
                <div>{props.fighter_1.days_last_win}</div>
                <span>Days Since Last Loss</span>
                <div>{props.fighter_0.days_last_loss}</div>
                <div>{props.fighter_1.days_last_loss}</div>
                <span>Coming Off A Loss</span>
                <div>{props.fighter_0.off_loss}</div>
                <div>{props.fighter_1.off_loss}</div>
                <span>UFC Fight Experience</span>
                <div>{props.fighter_0.ufc_fights}</div>
                <div>{props.fighter_1.ufc_fights}</div>
            </div>
        </div>
    )
};

export default MindStats;