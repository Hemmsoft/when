var assert = require('assert');
var when = require('../when.js');

describe('Test for when', () => {

	it('should trigger the first function ten times, then the second function once', () => {
		var firstFunctionTriggeredCount = 0;
		var secondFunctionTriggeredCount = 0;
		var firstFunction = () => {
			firstFunctionTriggeredCount++;
			return firstFunctionTriggeredCount != 10;
		}
		var secondFunction = () => {
			secondFunctionTriggeredCount++
			return secondFunctionTriggeredCount < 1;
		}
		new when(firstFunction,secondFunction,2);
		setTimeout(() => {
			assert.equal(firstFunctionTriggeredCount,10);
			assert.equal(secondFunctionTriggeredCount,1);
		},35);
	})

	it('should trigger the first function ten times, it should trigger the second function once it should trigger the third once', () => {
		var firstFunctionTriggeredCount = 0;
		var secondFunctionTriggeredCount = 0;
		var thirdFunctionTriggeredCount = 0;
		var firstFunction = () => {
			firstFunctionTriggeredCount++;
			return firstFunctionTriggeredCount != 10;
		}
		var secondFunction = () => {
			secondFunctionTriggeredCount++
			return secondFunctionTriggeredCount < 2;
		}
		var thirdFunction = () => {
			thirdFunctionTriggeredCount++;
			return false;
		}
		new when(firstFunction,[secondFunction,thirdFunction]);
		setTimeout(() => {
			assert.equal(firstFunctionTriggeredCount,10);
			assert.equal(secondFunctionTriggeredCount,2);
			assert.equal(thirdFunctionTriggeredCount,1);
		},30);
	})

	it('should trigger the first function ten times, it should trigger the second function twice it should trigger the third thrice', () => {
		var firstFunctionTriggeredCount = 0;
		var secondFunctionTriggeredCount = 0;
		var thirdFunctionTriggeredCount = 0;
		var firstFunction = () => {
			firstFunctionTriggeredCount++;
			return firstFunctionTriggeredCount < 10;
		}
		var secondFunction = () => {
			secondFunctionTriggeredCount++
			return secondFunctionTriggeredCount < 2;
		}
		var thirdFunction = () => {
			thirdFunctionTriggeredCount++;
			return thirdFunctionTriggeredCount < 3;
		}
		new when(firstFunction,[secondFunction,thirdFunction]);
		setTimeout(() => {
			assert.equal(firstFunctionTriggeredCount,10);
			assert.equal(secondFunctionTriggeredCount,2);
			assert.equal(thirdFunctionTriggeredCount,3);
		},40);
	})
})