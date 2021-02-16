async function getData(){
	return fetch('https://warply.s3.amazonaws.com/data/test_pois.json',
	{

        mode: 'no-cors',
	    method: "post",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(json)
	 })
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

export const FETCH_DATA='FETCH_DATA';
export const fetchDataSuccess = data => ({
	type:FETCH_DATA,
});