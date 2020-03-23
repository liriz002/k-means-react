// Action Types
export const ADVANCE_APPLICATION_STATE = 'ADVANCE_APPLICATION_STATE';
export const RESET_APPLICATION_STATE = 'RESET_APPLICATION_STATE';
export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';
export const UPDATE_NUM_OF_CLUSTERS = 'UPDATE_NUM_OF_CLUSTERS';
export const SET_AUTOMATIC = 'SET_AUTOMATIC';
export const SHOW_SETTINGS_MODAL = 'SHOW_SETTINGS_MODAL';
export const UPDATE_GLOBAL_PROPS = 'UDPATE_GLOBAL_PROPS';

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

export function showSettingsModal( show ) {
    return { 
        type: SHOW_SETTINGS_MODAL,
        show: show
    };   
}