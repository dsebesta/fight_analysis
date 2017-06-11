import React, {Component} from 'react';
import CommonOpponents from './CommonOpponents';

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
            const event_date = record.date.split('-');

            return (
                <tr key={index} className={resultFormat}>
                    <td> {event_date[0]} </td>
                    <td> {record.opponent} </td>
                    <td> {record.round} </td>
                    <td> {record.time} </td>
                    <td> {record.result} </td>
                    <td> {record.method} </td>
                </tr>
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
                        <CommonOpponents common_opponents={this.props.common_opponents}/>
                    </div>
                </div>
            )
        }

        return (
            <div>
                {this.renderNavbar()}
                <div className="matchup-container">
                    <table className="record-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Opponent</th>
                                <th>Round</th>
                                <th>Time</th>
                                <th>Result</th>
                                <th>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPastFights(activeTab)}
                        </tbody>
                    </table>
                </div>
            </div>
        )


    }
}

export default Record;