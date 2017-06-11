import React, {Component} from 'react';

class CommonOpponents extends Component {

    constructor(props) {
        super(props);

    }

    renderCommonFighter0() {
        const opponentObject = this.props.common_opponents;
        const opponentKeys = Object.keys(this.props.common_opponents);

        return opponentKeys.map((opponent) => {
            return opponentObject[opponent].map((fight, index) => {
                const fight0 = fight[0];
                let resultFormat;
                if (fight0.result === 'win') resultFormat = 'win-record';
                if (fight0.result === 'loss') resultFormat = 'loss-record';
                return (
                    <tr key={index} className={resultFormat}>
                        <td> {fight0.date} </td>
                        <td> {fight0.opponent} </td>
                        <td> {fight0.round} </td>
                        <td> {fight0.method} </td>
                    </tr>
                )
            })
        })
    }

    renderCommonFighter1() {
        const opponentObject = this.props.common_opponents;
        const opponentKeys = Object.keys(this.props.common_opponents);

        return opponentKeys.map((opponent) => {
            return opponentObject[opponent].map((fight, index) => {
                const fight1 = fight[1];
                let resultFormat;
                if (fight1.result === 'win') resultFormat = 'win-record';
                if (fight1.result === 'loss') resultFormat = 'loss-record';
                return (
                    <tr key={index} className={resultFormat}>
                        <td> {fight1.date} </td>
                        <td> {fight1.opponent} </td>
                        <td> {fight1.round} </td>
                        <td> {fight1.method} </td>
                    </tr>
                )
            })
        })
    }



    render() {

        return (
            <div className="common-container">
                <div className="common-section-left">
                    <table className="common-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Opponent</th>
                                <th>Round</th>
                                <th>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCommonFighter0()}
                        </tbody>
                    </table>
                </div>
                <div className="common-section-right">
                    <table className="common-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Opponent</th>
                                <th>Round</th>
                                <th>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCommonFighter1()}
                        </tbody>
                    </table>
                </div>
            </div>
        )


    }
}

export default CommonOpponents;