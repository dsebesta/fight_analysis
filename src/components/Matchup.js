import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchMatchup} from './../actions';
import GeneralStats from './GeneralStats';
import MindStats from './MindStats';
import BodyStats from './BodyStats';
import ComparisonStats from './ComparisonStats';
import Record from './Record';
import {Link} from 'react-router-dom';


class Matchup extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.renderNavbar = this.renderNavbar.bind(this);

        this.state = {
            activeTab: true
        }

    }

    componentWillMount() {
        const path = document.location.href;
        const pathIndexUFC = path.indexOf('ufc');
        const pathIndexSlash = path.lastIndexOf('/');
        const event_id = path.substring(pathIndexUFC+3, pathIndexSlash);
        const matchup_id = path.substring(pathIndexSlash+1);
        this.props.fetchMatchup(event_id, matchup_id);
    }

    setFighterInfo(id) {
        if (this.props.fighter.event_fighters[id]) {
            return this.props.fighter.event_fighters[id].fighter
        }
        return {
            fighter_name: 'Unknown Fighter'
        }
    }

    renderNavbar() {
        const {activeTab} = this.state;
        const activeClassStats = `stats-tab ${activeTab ? 'active' : ''}`;
        const activeClassRecord = `record-tab ${!activeTab ? 'active' : ''}`;

        return (
            <div className="matchup-navbar">
                <div className={activeClassStats} onTouchTap={!activeTab ? this.handleClick : ''}>STATS</div>
                <div className={activeClassRecord} onTouchTap={activeTab ? this.handleClick : ''}>RECORD</div>
            </div>
        )
    }

    handleClick() {
        this.setState({
            activeTab: !this.state.activeTab
        })
    }

    componentDidMount() {
        window.addEventListener('scroll', this.debounce(this.handleScroll), false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.debounce(this.handleScroll), false);
    }

    debounce(func, wait = 10, immediate = true) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    handleScroll() {
        if (window.scrollY > 180) {
            const header = document.querySelector(".matchup-header") || document.querySelector('.matchup-record-compare-navbar');
            header.classList.add("fixed-header");
        }
        else {
            const header = document.querySelector(".matchup-header") || document.querySelector('.matchup-record-compare-navbar');
            header.classList.remove("fixed-header");
        }
    }

    render() {

        if (!this.props.fighter) {
            return (
                <h3>Loading....</h3>
            )
        }

        const fighter_0 = this.setFighterInfo(0);
        const fighter_1 = this.setFighterInfo(1);
        const common_opponents = this.props.fighter.common;
        const {activeTab} = this.state;

        if (activeTab) {
            return (
                <div>
                   {this.renderNavbar()}
                   <div className="matchup-container">
                       <div className="matchup-header">
                                <span></span>

                               <div>{fighter_0.fighter_name}</div>


                               <div>{fighter_1.fighter_name}</div>

                       </div>
                       <GeneralStats fighter_0={fighter_0} fighter_1={fighter_1} />
                       <MindStats fighter_0={fighter_0} fighter_1={fighter_1} />
                       <BodyStats fighter_0={fighter_0} fighter_1={fighter_1} />
                       <ComparisonStats fighter_0={fighter_0} fighter_1={fighter_1} />
                   </div>
                </div>
           )
        }
        else {
            return (
                <div>
                    {this.renderNavbar()}
                    <Record fighter_0={fighter_0} fighter_1={fighter_1} common_opponents={common_opponents}/>
                </div>
            )

        }
    }
}


function mapStateToProps(state) {
    return {
        fighter: state.fighterProps.matchup
    }
}

export default connect(mapStateToProps, {fetchMatchup}) (Matchup);