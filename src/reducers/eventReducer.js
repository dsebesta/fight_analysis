import {FETCH_EVENTS_ALL, FETCH_EVENT, FETCH_MATCHUP} from './../actions/types';

function eventData(state = [], action) {
    switch (action.type) {
        case FETCH_EVENTS_ALL:
            let newState = JSON.parse(JSON.stringify(state));
            newState.events = action.payload.data;
            return newState;
        case FETCH_EVENT:
            let newState1 = JSON.parse(JSON.stringify(state));
            newState1.event = action.payload.data;
            return newState1;
        case FETCH_MATCHUP:
            let newState2 = JSON.parse(JSON.stringify(state));
            newState2 = action.payload.data;
            return newState2;
    }
    return state;
}

export default eventData;