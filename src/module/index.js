const fs = require('fs');
const Buffer = require('buffer').Buffer;
const request = require('request');

const defaultOpts = {
	encoding: 'utf8'
};

	/** 
	 *  The main class for the library
	 */
class API {
	/**
	 * Create a new instance of the class
	 * @constructor
	 * @param {(string|Object|Buffer)} doc - The API doc to use for this instance
	 * @param {Object} [opts={}] - The options for this instance
	 * @param {string} [opts.encoding=utf8] - The encoding to use, applies to file path and Buffer doc types
	 */
	constructor (doc, opts = {}) {

		this.opts = Object.assign({}, defaultOpts, this.opts);

		if(typeof doc == 'string') { // if a string it could be a url, file path, or json string
			var urlRegex = /^(http|https)/;
			var jsonRegex = /^\{/;
			if(urlRegex.test(doc)) { // check if it's a url
				request({
					method: 'GET',
					uri: doc,
					preambleCRLF: false,
					postambleCRLF: false,
				},
				function (error, response, body) {
					if (error) {
						throw new Error('Error while retreving api doc: ' + error);
					} 
					if(typeof body == 'string' || jsonRegex.test(body)) {
						this.doc = JSON.parse(body);
					} else if (doc === Object(doc) && Object.prototype.toString.call(doc) !== '[object Array]') {
						this.doc = body;
					} else {
						throw new Error('Unknown formatted response to url fetch for api doc');
					}
				});
			} else if (fs.existsSync(doc)) { // check if it's a file
				// read the file with the specified encoding
				var file = fs.readFileSync(doc, {
					encoding: this.opts.encoding
				});
				this.doc = JSON.parse(file);
			} else if (jsonRegex.test(doc)) { // check if it's a json string
				this.doc = JSON.parse(doc);
			} else {
				throw new Error('First parameter is not a url, json string, json object, or file path.');
			}
		} else if (doc instanceof Buffer) { // if it's a buffer, convert it to a string using the specified encoding
			this.doc = doc.toString(this.opts.encoding);
		} else if (doc === Object(doc) && Object.prototype.toString.call(doc) !== '[object Array]') { // if it's an object then we can just assign it directly
			this.doc = doc;
		} else {
			throw new Error('First parameter is not a url, json string, json object, file path, or buffer.');
		}

		//TODO: lint the doc

		
	}
}

module.exports = API;