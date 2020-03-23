import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';
import * as Constants from '../../constants/index';

// Reducer #1: application state + settings
const initialState = {
    applicationState: 0,
    numOfClusters: Constants.Global.INITIAL_NUM_OF_CLUSTERS,
    isAutomatic: false,
    showSettingsModal: false,
    pointsDistribution: "linear"
}

const globalProps = ( state = initialState, action ) => {
    switch (action.type) {
        case Actions.ADVANCE_APPLICATION_STATE:
            return { ...state, applicationState: state.applicationState + 1 };
        case Actions.RESET_APPLICATION_STATE:
            console.log(state);
            return { ...state, applicationState: Constants.ApplicationStates.RANDOMIZE, isAutomatic: false }
        case Actions.SET_AUTOMATIC:
            return { ...state, isAutomatic: action.isAutomatic };
        case Actions.SHOW_SETTINGS_MODAL:
            return { ...state, showSettingsModal: action.show }
        case Actions.UPDATE_GLOBAL_PROPS:
            return { ...state, ...action.globalProps };
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