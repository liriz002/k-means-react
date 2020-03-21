import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';
import * as Constants from '../../constants/index';

// Reducer #1: application state + settings
const initialState = {
    applicationState: 0,
    totalClusters: Constants.Global.INITIAL_TOTAL_CLUSTERS,
    isAutomatic: false
}

const globalProps = ( state = initialState, action ) => {
    switch (action.type) {
        case Actions.ADVANCE_APPLICATION_STATE:
            return { ...state, applicationState: state.applicationState + 1 };
        case Actions.RESET_APPLICATION_STATE:
            return { ...state, applicationState: Constants.ApplicationStates.RANDOMIZE }
        case Actions.SET_AUTOMATIC:
            return { ...state, isAutomatic: action.isAutomatic };
        default:
            return state;
    }
}

// Reducer #2: chart data
const initialData = {
    datasets: []
}

const data = ( state = initialData, action ) => {
    switch (action.type) {
        case Actions.UPDATE_CHART_DATA:
            return { ...state, datasets: [ ...action.chartData ] };
        default:
            return state;
    }
}

const kMeansApp = combineReducers({
    globalProps,
    data
});

export default kMeansApp;