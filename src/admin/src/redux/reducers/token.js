import { SET_UID, CLEAR_TOKEN_ALL } from '../actions';
import { SET_TOKEN, SET_TOKEN_ALL } from '../actions';

let defaultToken = localStorage.getItem("token") || '';
let defaultAid = localStorage.getItem("aid") || '';

let defaultState = {
    token: defaultToken,
    aid: defaultAid
}

export default (state = defaultState, action) => {
    let ownState = {...state};
    switch (action.type) {
        case SET_TOKEN:
            ownState.token = action.token;
            localStorage.setItem("token", action.token);
            return ownState;
        case SET_UID:
            ownState.id = action.aid;
            localStorage.setItem("aid", action.aid);
            return ownState;
        case SET_TOKEN_ALL:
            ownState = {
                token: action.token,
                aid: action.aid
            }
            localStorage.setItem("token", action.token);
            localStorage.setItem("aid", action.aid);
            return ownState;
        case CLEAR_TOKEN_ALL:
            let noneState = {
                token: '',
                aid: ''
            }
            localStorage.setItem("token", '');
            localStorage.setItem("aid", '');
            return noneState;
        default:
            return state;
    }
}
