const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable')
const util = require('util');

function start(response){
	console.log('Request handler "start" was called');

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post" enctype="multipart/form-data"> '+
		
		'<textarea name="text" row="20" cols="60"></textarea>'+
		'<input type="file" name="upload"/>'+
		'<input type="submit" value="Submit text"/>'+

		'</form>'+
		'</body>'+
		'</head>'+
		'</html>';

	response.writeHead(200, {'Content-Type':'text/html'});
	response.write(body);
	response.end();
	
}

function upload(response, request){
	console.log('Request handler "upload" was called');

	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files){
		console.log('parsing done');
		// console.log('files.upload='+files.upload);
		// form.uploadDir = './tmp';
		// fs.renameSync(files.upload.path, './tmp/test.jpg');

		var readStream = fs.createReadStream(files.upload.path);
		var writeStream = fs.createWriteStream('./tmp/test.jpg');
		util.pump(readStream, writeStream, function(){
			fs.unlinkSync(files.upload.path);
		})

		console.log(files.upload.path);
		response.writeHead(200, {'Content-Type':'text/html'});
		response.write('received image:<br/>');
		response.write('<img src="/show" />');
		response.end();
	})

	
}

function show(response){
	console.log('Request handler "show" was called.');
	fs.readFile('./tmp/test.jpg', 'binary', function(error, file){
		if(error){
			response.writeHead(500, {'Content-Type':'text/plain'});
			response.write(error+'\n');
			response.end();
		}else{
			response.writeHead(200, {'Content-Type':'text/plain'});
			response.write(file, 'binary');
			response.end();
		}
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;