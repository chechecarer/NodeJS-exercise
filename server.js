const http = require('http');
const url = require('url');


const start = (route, handle)=>{
	const hostname = '127.0.0.1';
	const port = 3000;
	const server = http.createServer((req, res)=>{

		var pathname = url.parse(req.url).pathname;
		console.log('Request for '+pathname+' received.');

		

		res.statusCode = 200;
		res.setHeader('ContentType', 'text/plain');
		var content = route(handle, pathname);
		res.write(content);
		res.end();
	});

	server.listen(port, hostname, ()=>{
		console.log('Server is running at http://'+hostname+':'+port+'/');
	});
};

exports.start = start;
