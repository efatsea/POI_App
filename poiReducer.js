const initialState = {
	data: [],
};

export default function poiReducer(
	state = initialState,
	action
){
	switch(action.type){
		case FETCH_DATA:
			return{
				...state,
				
			};
		default:
			return state;
	}
}