import {combineReducers} from 'redux'
import {FETCH_DATA, ADD_POSITION} from './poiAction'

const initialState = {
	data: [],
	position:[]
};
//The reducer for fetchig the datas
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

//the reducer for adding the user position in the store.
function addReducer(
	state=initialState,action
	){
	switch(action.type){
		case ADD_POSITION:
			return position = action.position
		default:
			return state;
	}
}

export default combineReducers({data:poiReducer, position:addReducer})

