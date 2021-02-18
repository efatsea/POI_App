//The actions to redux store.

async function getData(){
	return fetch('https://warply.s3.amazonaws.com/data/test_pois.json')
	.then(res=>res.json())
}



export function fetchData(){
	return async dispatch=>{
		return getData()
			.then (json=>{
				dispatch(fetchDataSuccess(json));
				return json;
			})
			.catch(error=>
				console.log(error)
			);
	};
}

export function addPosition(position){
	return{
		type: ADD_POSITION,
		position
	}
}

export function handleAdd(position){
	return(dispatch)=>{
		dispatch(addPosition(position));
	}

	
}

export const ADD_POSITION ='ADD_POSITION';
export const FETCH_DATA='FETCH_DATA';
export const fetchDataSuccess = data => ({
	type:FETCH_DATA,
});