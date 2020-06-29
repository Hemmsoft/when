var when = require('../when.js');

var counter = 0;
new when(
	() => {
		counter++;
		console.log('counting to ten: ' + counter)
		return counter < 10;
	},
	() => {
		counter++;
		console.log('counting to twenty: ' + counter);
		return counter < 20;
	}
);