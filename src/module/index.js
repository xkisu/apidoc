const fs = require('fs');
const Buffer = require('buffer').Buffer;
const request = require('request');

const defaultOpts = {
    encoding: 'utf8'
}

class API {
    constructor (doc, opts) {

        this.opts = Object.assign({}, defaultOpts, this.opts)

        if(typeof doc == "string") {
            var urlRegex = /^(http|https)/;
            var jsonRegex = /^\{/;
            if(urlRegex.test(doc)) {
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
                })
            } else if (fs.existsSync(doc)) {
                var file = fs.readFileSync(doc, {
                    encoding: this.opts.encoding
                });
                this.doc = JSON.parse(file);
            } else if (jsonRegex.test(doc)) {
                this.doc = JSON.parse(doc);
            } else {
                throw new Error("First parameter is not a url, json object, or file path.");
            }
        } else if (doc instanceof Buffer) {
            this.doc = doc.toString(this.opts.encoding);
        } else if (doc === Object(doc) && Object.prototype.toString.call(doc) !== '[object Array]') {
            this.doc = doc;
        } else {
            throw new Error("First parameter is not a url, json object, file path, or buffer.");
        }
    }
}

module.exports = API;