(function() {

	/**
	 * @property {number} interval 		- The interval calling the wait function
	 * @property {boolean} done 		- When doing
	 * @property {callable} doing		- Reference to function to call until returns true
	 * @property {callable|array} then	- Reference to function(s) to call when doing is true
	 * @property {number} timer			- Interval timer in milliseconds
	 */
	 module.exports = class When {

	 	interval = null;
	 	done = false;
	 	doing = null;
	 	then = null;
	 	timer = 1;

		/**
		 * Creates an interval and calls the first parameter as a function until it
		 * returns false, then does the same for the next parameter
		 *
		 * @param {callable} doing The function to repeat in an interval until it 
		 *     returns typecast-ically false
		 * @param {callable|object} wait The function to repeat in an interval until it 
		 *     returns typecast-ically false
		 * @param {number} timer Optional timer in milliseconds passed to setInterval
		 * @return {when}
		 * @chainable
		 */
		 constructor(doing,then,timer) {
		 	return this.when(doing,then,timer);
		 }

		/**
		 * Creates an interval and calls the first parameter as a function until it
		 * returns false, then does the same for the next parameter
		 *
		 * @param {callable} doing The function to repeat in an interval until it 
		 *     returns typecast-ically false
		 * @param {callable|object} wait The function to repeat in an interval until it 
		 *     returns typecast-ically false
		 * @param {number} timer Optional timer in milliseconds passed to setInterval
		 * @return {when}
		 * @chainable
		 */
		 when(doing,then,timer) {
		 	this.timer = timer || 1;
		 	this.doing = doing;
		 	this.then = then;
		 	var _this = this;
		 	this.interval = setInterval(() => {
		 		_this.done = !_this.isFunction(_this.doing) || !_this.doing();
		 		if(_this.done) {
		 			_this.stop();
		 			if(Array.isArray(_this.then)) {
		 				var doing = _this.then.shift();
		 				var then = _this.then.length == 1 ? _this.then.shift() : _this.then;
		 			}
		 			if(_this.isFunction(_this.then)) {
		 				var doing = _this.then;
		 				var then = _this.stop;
		 			}
		 			_this.when(doing, then, _this.timer);
		 		}
		 	}, timer);

		 	return this;
		 }

		 isFunction(value) {
		 	return Object.prototype.toString.call(value) === "[object Function]";
		 }

		 stop() {
		 	clearInterval(this.interval);
		 }

		 isDoing() {
		 	return !this.done;
		 }

	};
})();