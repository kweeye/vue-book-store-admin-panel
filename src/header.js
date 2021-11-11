function getToken () {
	const token = window.localStorage.getItem('token')
	const data = JSON.parse(token)
	let headers = {
	'Accept': 'application/json;charset=utf-8'
	};
	if(token !== '') {
	headers['Authorization'] = "Bearer "+ data
	}
	return headers
}
module.exports = {getToken}