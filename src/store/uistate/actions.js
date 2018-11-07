import * as types from './types'

export function updateTiles(tiles) {
    return function(dispatch) {
        dispatch({ type: types.UPDATE_DASHBOARD_TILES, tiles});
    }
}