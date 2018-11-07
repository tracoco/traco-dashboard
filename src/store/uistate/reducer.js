import { initialState } from '../initialState';
import * as types from './types';

export default function uistateReducer(state = initialState.uistate, action) {
  switch (action.type) {
    case types.UPDATE_DASHBOARD_TILES:
      return {
        ...state,
        dashboardTile: action.tiles
      } 
    default:
      return state
  }
}