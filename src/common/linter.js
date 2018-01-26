
var JSONLint = require('json-lint');

class Linter {
	constructor (doc) {
		if (doc === Object(doc) && Object.prototype.toString.call(doc) !== '[object Array]') {
			this.json = doc;
		} else {
			throw new Error('Variable passed to Linter is not an object!');
		}
        
	}

	lint () {
		var lint = JSONLint(JSON.stringify(this.json));
		if ( lint.error ) {
			throw new Error(lint.error);
		} else {
			return true;
		}
	}
}

if(module) {
	module.exports = Linter;
}