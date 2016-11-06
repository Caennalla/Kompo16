//Define required additional libraries
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chat = require('./chatfeature');

//URI for getting the index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var chatFeature = new chat(io);

http.listen(3001, function(){
	console.log('Chat component running @ port 3001');
});
