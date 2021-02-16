import {combineReducers} from 'redux'
import {FETCH_DATA} from './poiAction'

const initialState = {
	data: [],
};

function poiReducer(
	state = initialState,
	action
){
	switch(action.type){
		case FETCH_DATA:
			return{
				...state,
				data: action.data,
				
			}
		default:
			return state;
	}
}

export default combineReducers({data:poiReducer})

