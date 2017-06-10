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
        <div className="matchup-stats-container">
            <div className="matchup-stats-table">
                <span>MMA Career Length</span>
                <div>{props.fighter_0.years_mma_career}</div>
                <div>{props.fighter_1.years_mma_career}</div>
                <span>Total MMA Rounds</span>
                <div>{props.fighter_0.mma_rounds}</div>
                <div>{props.fighter_1.mma_rounds}</div>
                <span>Average Rounds / Year</span>
                <div>{props.fighter_0.year_avg_rounds}</div>
                <div>{props.fighter_1.year_avg_rounds}</div>
                <span>KO Losses</span>
                <div>{props.fighter_0.losses_ko}</div>
                <div>{props.fighter_1.losses_ko}</div>
                <span>Submission Losses</span>
                <div>{props.fighter_0.losses_sub}</div>
                <div>{props.fighter_1.losses_sub}</div>
                <span>Days Since Last KO Loss</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
                <span>Days Since Last Submission Loss</span>
                <div>{props.fighter_0.ip}</div>
                <div>{props.fighter_1.ip}</div>
            </div>
        </div>
    )
};

export default BodyStats;