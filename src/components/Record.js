import React, {Component} from 'react';
import CommonOpponents from './CommonOpponents';
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

class Record extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.fighter_0
        }
    }

    renderPastFights(fighter) {
        return fighter.records.map((record, index) => {

            let resultFormat;
            if (record.result === 'win') resultFormat = 'win-record';
            if (record.result === 'loss') resultFormat = 'loss-record';

            return (
                <TableRow key={index} style={tableStyle.row} className={resultFormat}>
                    <TableRowColumn style={tableStyle.column}> {record.date} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.opponent} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.round} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.time} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.result} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.method} </TableRowColumn>
                </TableRow>
            )
        })
    }

    renderNavbar() {
        const {activeTab} = this.state;
        const {fighter_0, fighter_1} = this.props;

        return (
            <div className="matchup-record-compare-navbar">
                <div className={`record-compare-tab ${activeTab === fighter_0 ? 'active' : ''}`} onTouchTap={activeTab === 'fighter_0' ? '' : this.handleClick.bind(this, fighter_0)}>{fighter_0.fighter_name}</div>
                <div className={`record-compare-tab ${activeTab === 'common' ? 'active' : ''}`} onTouchTap={activeTab === 'common' ? '' : this.handleClick.bind(this, 'common')}>common</div>
                <div className={`record-compare-tab ${activeTab === fighter_1 ? 'active' : ''}`} onTouchTap={activeTab === 'fighter_1' ? '' : this.handleClick.bind(this, fighter_1)}>{fighter_1.fighter_name}</div>
            </div>
        )
    }

    handleClick(tab) {
        this.setState({
            activeTab: tab
        })
    }

    render() {

        const {activeTab} = this.state;

        if (activeTab === 'common') {
            return(
                <div>
                    {this.renderNavbar()}
                    <div className="matchup-container">
                        <CommonOpponents />
                    </div>
                </div>
            )
        }

        return (
            <div>
                {this.renderNavbar()}
                <div className="matchup-container">
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow style={tableStyle.row}>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Date</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Opponent</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Round</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Time</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Result</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Method</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            {this.renderPastFights(activeTab)}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )


    }
}

export default Record;