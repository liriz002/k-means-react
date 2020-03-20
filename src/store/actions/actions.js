// Action Types
export const ADVANCE_APPLICATION_STATE = 'ADVANCE_APPLICATION_STATE';
export const INITIALIZE_CHART_DATA = 'INITIALIZE_CHART_DATA';
export const UPDATE_CLUSTERS_NUMBER = 'UPDATE_CLUSTERS_NUMBER';

// Action Creators
export function advanceState() {
    return {
         type: ADVANCE_APPLICATION_STATE
    };
}

export function initializeChartData( datasets ) {
    return {
         type: INITIALIZE_CHART_DATA, 
         datasets: datasets
    };
}

export function updateClustersNumber( totalClusters ) {
    return {
        type: UPDATE_CLUSTERS_NUMBER,
        totalClusters: totalClusters
    }
}