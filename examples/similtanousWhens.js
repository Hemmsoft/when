var when = require('../when.js');

var counter = 0;
var count = 1;
new when(
	() => {
		counter += count;
		console.log('counting to ten: ' + counter)
		return counter < 10;
	},
	[
		() => {
			counter += count;
			console.log('counting to fifteen: ' + counter);
			return counter < 15;
		},
		() => {
			counter += count;
			console.log('counting to thirty: ' + counter);
			return counter < 30;
		},
	]
);

new when(
	() => {
		count += 1;
		return counter < 15;
	},
	() => {
		count -= 1;
		return counter < 30;
	}
);