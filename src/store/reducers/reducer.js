import { combineReducers } from 'redux';


import * as Actions from '../actions/actions';

const initialState = {
    applicationState: 0
}

// Reducer #1
const applicationState = ( state = initialState, action ) => {
    switch (action.type) {
        case Actions.ADVANCE_APPLICATION_STATE:
            return { ...state, applicationState: state.applicationState + 1 };
        break;

        default:
            return state;
    }
}

// Reducer #2
/*
const chartData = ( state = initialState, action ) => {
    return state;
}
*/

const kMeansApp = combineReducers({
    applicationState,
    //chartData
});

export default kMeansApp;