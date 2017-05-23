import {FETCH_EVENTS_ALL, FETCH_EVENT} from './../actions/types';

function eventData(state = [], action) {
    switch (action.type) {
        case FETCH_EVENTS_ALL:
            let newState = JSON.parse(JSON.stringify(state));
            newState = action.payload.data;
            return newState;
        case FETCH_EVENT:
            let newState1 = JSON.parse(JSON.stringify(state));
            newState1 = action.payload.data;
            return newState1;
    }
    return state;
}

export default eventData;