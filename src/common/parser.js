
class Parser {
	constructor (doc) {
		if (doc === Object(doc) && Object.prototype.toString.call(doc) !== '[object Array]') {
			this.json = doc;
		} else {
			throw new Error('Variable passed to Parser is not an object!');
        }
        
        this.routes = this.json.routes;
        this.defaults = this.json.defaults;
    }
    
    verify () {
        // check for valid route and duplicate routes
        for (let key in this.routes) {
            let route = this.routes[key];

            if(!route.route) {
                throw new Error(`Route "${key}" does not define a route!`);
            } else {
                for (let param in route.parameters) {
                    var reg = `(:${param}$)|(:${param}\/)`;
                    var re = new RegExp(reg, "gm");
                    if (!re.test(route.route)) {
                        throw new Error(`Parameter "${param}" is not in route ${key}:"${route.route}"!`);
                    }
                }
            }
        }

        return true;
    }
}

if(module) {
	module.exports = Parser;
}