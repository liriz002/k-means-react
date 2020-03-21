// Action Types
export const ADVANCE_APPLICATION_STATE = 'ADVANCE_APPLICATION_STATE';
export const RESET_APPLICATION_STATE = 'RESET_APPLICATION_STATE';
export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';
export const UPDATE_CLUSTERS_NUMBER = 'UPDATE_CLUSTERS_NUMBER';
export const SET_AUTOMATIC = 'SET_AUTOMATIC';

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

export function updateClustersNumber( totalClusters ) {
    return {
        type: UPDATE_CLUSTERS_NUMBER,
        totalClusters: totalClusters
    }
}

export function setAutomatic( isAutomatic ) {
    return {
        type: SET_AUTOMATIC,
        isAutomatic: isAutomatic
    }
}
