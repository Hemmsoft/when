# When
An alternative to await. Repeatidly call the first function until it returns false, then do the same for the next function.

### Installation
```
npm install when
```

### Example usage
## Staged Counters
```
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
```
output:
```
counting to ten: 1
counting to ten: 2
counting to ten: 3
counting to ten: 4
counting to ten: 5
counting to ten: 6
counting to ten: 7
counting to ten: 8
counting to ten: 9
counting to ten: 10
counting to twenty: 11
counting to twenty: 12
counting to twenty: 13
counting to twenty: 14
counting to twenty: 15
counting to twenty: 16
counting to twenty: 17
counting to twenty: 18
counting to twenty: 19
counting to twenty: 20
```
## Handeling many callbacks
As an example, you can use when to listen for callbacks by waiting for until they have all responded.
```
var requestOne = My.Awesome.ApiCallOne(callback); // Theoretical async call without a promise
var requestTwo = My.Awesome.ApiCallTwo(callback); // Theoretical async call without a promise
var responses = 0;

function callback() {
	repsonses++;
}
function awaitedResponses() {
	return responses < 2;
}
function handleResponses() {
	console.log('The API replied to both calls!')
}

new when(awaitedResponses,handleResponses);
```

## Similtanious whens
```
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
```
Output:
```
counting to ten: 1
counting to ten: 3
counting to ten: 6
counting to ten: 10
counting to fifteen: 15
counting to thirty: 21
counting to thirty: 26
counting to thirty: 30
```