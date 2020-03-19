// Action Types
export const ADVANCE_APPLICATION_STATE = 'ADVANCE_APPLICATION_STATE';

// Action Creators
export function advanceState() {
    return { type: ADVANCE_APPLICATION_STATE };
}