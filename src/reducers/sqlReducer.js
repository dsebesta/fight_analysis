import {SQL_IMPORT} from './../actions/types';

function sqlData(state = {}, action) {
    switch (action.type) {
        case SQL_IMPORT:
            let newState = JSON.parse(JSON.stringify(state));
            newState = action.payload.data;
            return newState;
    }
    return state;
}

export default sqlData;