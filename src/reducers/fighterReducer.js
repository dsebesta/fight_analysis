import {FETCH_FIGHTERS} from './../actions/types';

function fighterData(state = {}, action) {
    switch (action.type) {
        case FETCH_FIGHTERS:
            let newState = JSON.parse(JSON.stringify(state));
            newState = action.payload.data;
            return newState;
    }
    return state;
}

export default fighterData;