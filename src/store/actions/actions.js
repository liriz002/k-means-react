// Action Types
export const ADVANCE_APPLICATION_STATE = 'ADVANCE_APPLICATION_STATE';
export const RESET_APPLICATION_STATE = 'RESET_APPLICATION_STATE';
export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';
export const UPDATE_NUM_OF_CLUSTERS = 'UPDATE_NUM_OF_CLUSTERS';
export const SET_AUTOMATIC = 'SET_AUTOMATIC';
export const UPDATE_SHOW_SETTINGS_MODAL = 'UPDATE_SHOW_SETTINGS_MODAL';
export const UPDATE_GLOBAL_PROPS = 'UDPATE_GLOBAL_PROPS';
export const SET_SHOULD_PERFORM_STEP = 'SET_SHOULD_PERFORM_STEP';
export const INCREMENT_ALGORITHM_STEPS = 'INCREMENT_ALGORITHM_STEPS';
export const UPDATE_SHOW_RESET_BUTTON = 'UPDATE_SHOW_RESET_BUTTON';
export const UPDATE_SHOW_SUMMARY_MODAL = 'UPDATE_SHOW_SUMMARY_MODAL';

// Action Creators
export function advanceState() {
    return {
         type: ADVANCE_APPLICATION_STATE
    };
}

export function resetApplicationState() {
    return {
        type: RESET_APPLICATION_STATE
    };
}

export function updateChartData( chartData ) {
    return {
         type: UPDATE_CHART_DATA, 
         chartData: chartData
    };
}

export function updateGlobalProps( props ) {
    return {
        type: UPDATE_GLOBAL_PROPS,
        globalProps: props
    };
}

export function updateNumOfClusters( numOfClusters ) {
    return {
        type: UPDATE_NUM_OF_CLUSTERS,
        numOfClusters: numOfClusters
    }
}

export function setAutomatic( isAutomatic ) {
    return {
        type: SET_AUTOMATIC,
        isAutomatic: isAutomatic
    }
}

export function updateShowSettingsModal( show ) {
    return { 
        type: UPDATE_SHOW_SETTINGS_MODAL,
        show: show
    };   
}

export function setShouldPerformStep( performStep ) {
    return {
        type: SET_SHOULD_PERFORM_STEP,
        performStep: performStep
    }
}

export function incrementAlgorithmSteps() {
    return {
        type: INCREMENT_ALGORITHM_STEPS
    }
}

export function updateShowResetButton( show ) {
    return {
        type: UPDATE_SHOW_RESET_BUTTON,
        show: show
    }
}

export function updateShowSummaryModal( show ) {
    return {
        type: UPDATE_SHOW_SUMMARY_MODAL,
        show: show
    };
};