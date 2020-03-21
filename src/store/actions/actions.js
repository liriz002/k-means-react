// Action Types
export const ADVANCE_APPLICATION_STATE = 'ADVANCE_APPLICATION_STATE';
export const INITIALIZE_CHART_DATA = 'INITIALIZE_CHART_DATA';
export const UPDATE_CLUSTERS_NUMBER = 'UPDATE_CLUSTERS_NUMBER';
export const SET_AUTOMATIC = 'SET_AUTOMATIC';

// Action Creators
export function advanceState() {
    return {
         type: ADVANCE_APPLICATION_STATE
    };
}

export function initializeChartData( chartData ) {
    return {
         type: INITIALIZE_CHART_DATA, 
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