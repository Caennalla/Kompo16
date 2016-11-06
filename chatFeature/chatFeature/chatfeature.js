//ECMA 6 doesn't need this, because it is always strict, but let's leave this here
"use strict";

var playerArray = [];
class chatFeature{
	constructor(socketio){

		//On connection
		socketio.on('connection', function(socket){
			console.log("A socket has connected");
			playerArray.push(socket);
			/*/ This is here to test if connections are stored in to array
			for (var i = 0; i < playerArray.length; i++){
				console.log(i);
			}/*/

			//Message handling
			socket.on('chat message', function(msg){
				//Because there is no connection to the login component yet
				//Just use the number for the joined player
				//Problem with this is that player numbers will change during runtime
				//Needs login data for real names
				var index = playerArray.indexOf(socket);
				index++;
				msg = 'Player ' + index + ': ' + msg;
				socketio.emit('chat message', msg);
			});

			//On disconnect
			socket.on('disconnect', function(){
				console.log("A socket has disconnected");
				var index = playerArray.indexOf(socket);
				playerArray.splice(index, 1);
			});
		});
		
	}

}

module.exports = chatFeature;