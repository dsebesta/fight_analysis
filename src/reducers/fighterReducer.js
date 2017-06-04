import {FETCH_FIGHTER, FETCH_MATCHUP} from './../actions/types';

function fighterData(state = {}, action) {
    switch (action.type) {
        case FETCH_FIGHTER:
            let newState = JSON.parse(JSON.stringify(state));
            newState = action.payload.data;
            return newState;
        case FETCH_MATCHUP:
            let newState2 = JSON.parse(JSON.stringify(state));
            newState2.matchup = action.payload.data;
            return newState2;
    }
    return state;
}

export default fighterData;