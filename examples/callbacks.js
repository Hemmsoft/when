var when = require('../when.js');

var requestOne = My.Awesome.ApiCallOne(callback);
var requestTwo = My.Awesome.ApiCallTwo(callback);
var responses = 0;

function callback() {
	repsonses++;
}
function awatingResponses() {
	return responses < 2;
}
function handleResponses() {
	console.log('The API replied to both calls!')
}

new when(awatingResponses,handleResponses);