import {FETCH_EVENTS_ALL} from './../actions/types';

function eventData(state = [], action) {
    switch (action.type) {
        case FETCH_EVENTS_ALL:
            let newState = JSON.parse(JSON.stringify(state));
            newState = action.payload.data;
            return newState;
    }
    return state;
}

export default eventData;