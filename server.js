const http = require('http');
const url = require('url');


const start = (route, handle)=>{
	const hostname = '127.0.0.1';
	const port = 3000;
	const server = http.createServer((req, res)=>{
		var postData = '';
		var pathname = url.parse(req.url).pathname;
		console.log('Request for '+pathname+' received.');

		req.setEncoding('UTF8');

		req.addListener('data', (postDataChunk)=>{
			postData += postDataChunk;
			console.log('Received POST data chunk "'+postDataChunk+' ".');
		});
		console.log('postData='+postData);
		req.addListener('end', ()=>{
			route(handle, pathname, res, postData);
		});
	});

	server.listen(port, hostname, ()=>{
		console.log('Server is running at http://'+hostname+':'+port+'/');
	});
};

exports.start = start;
