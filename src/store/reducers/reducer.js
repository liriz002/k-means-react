import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';
import * as Constants from '../../constants/index';

// Reducer #1: application state + settings
const initialState = {
    applicationState: 0,
    numOfClusters: Constants.Global.INITIAL_NUM_OF_CLUSTERS,
    isAutomatic: false,
    showSettingsModal: false,
    showSummaryModal: false,
    showExplainerModal: false,
    pointsDistribution: "linear",
    shouldPerformStep: false,
    currentAlgorithmSteps: 0,
    showResetButton: false,
}

const globalProps = ( state = initialState, action ) => {
    switch (action.type) {
        case Actions.ADVANCE_APPLICATION_STATE:
            return { ...state, applicationState: state.applicationState + 1 };
        case Actions.RESET_APPLICATION_STATE:
            return { 
                ...state,
                applicationState: Constants.ApplicationStates.RANDOMIZE,
                isAutomatic: false,
                shouldPerformStep: true,
                currentAlgorithmSteps: 0,
                showResetButton: false
             };
        case Actions.SET_AUTOMATIC:
            return { ...state, isAutomatic: action.isAutomatic };
        case Actions.UPDATE_SHOW_SETTINGS_MODAL:
            return { ...state, showSettingsModal: action.show }
        case Actions.UPDATE_GLOBAL_PROPS:
            return { ...state, ...action.globalProps };
        case Actions.SET_SHOULD_PERFORM_STEP:
            return { ...state, shouldPerformStep: action.shouldPerformStep };
        case Actions.INCREMENT_ALGORITHM_STEPS:
            return { ...state, currentAlgorithmSteps: state.currentAlgorithmSteps + 1 };
        case Actions.UPDATE_SHOW_RESET_BUTTON:
            return { ...state, showResetButton: action.show }
        case Actions.UPDATE_SHOW_SUMMARY_MODAL:
            return { ...state, showSummaryModal: action.show }; 
        case Actions.UPDATE_SHOW_EXPLAINER_MODAL:
            return { ...state, showExplainerModal: action.show };
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