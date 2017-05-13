import {AUTH_USER, AUTH_ERROR, LOGOUT_USER} from '../actions/types';

// export default function(state = {}, action) {
//     switch (action.type) {
//         case AUTH_USER:
//             return {
//                 ...state,
//                 error: '',
//                 authenticated: true
//             };
//         case AUTH_ERROR:
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         case LOGOUT_USER:
//             return {
//                 ...state,
//                 error: '',
//                 authenticated: false
//             };
//     }
//     return state;
// }



export default function(state = {}, action) {
    return state;
}