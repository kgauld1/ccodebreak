function clean(str){
	str = str.trim().replace(/</g, '&lt').replace(/>/g, '&gt');
	return str;
}

function cleanName(str){
	console.log(typeof(str))
	str = clean(str);
	if(str.length > 15) str = str.substr(0, 15);
	return str;
}
var numpeople = 2;

const fetch = require('node-fetch');


module.exports = (http) => {
	var io = require('socket.io')(http);

	class Room{
		constructor(id, sockets){
			this.id = id;
			this.players = sockets;
			this.names = [];
			for (let p of sockets){
				this.names.push([p.name, p.id]);
			}
			this.chat = [];
			setTimeout(() => {
				this.end(false);
			}, 600000);
		}
		start(){
			io.in(this.id).emit('starting', this.names);
		}
		sendChat(name, message){
			io.in(this.id).emit('chat', {text: message, name: name});
			this.chat.push({text: message, name: name});
		}
		end(cond){
			io.in(this.id).emit('end', {won: cond, name: this.chatbotName});
		}
	}

	var rooms = {};
	var stor = {};
	var waiting = [];

	function createGroup(){
		let randKey = Math.round(Math.random()*1e5);
		available[randKey] = {players: []};
		return "" + randKey;
	}

	io.on('connection', (socket) => {
		let name = "";

		socket.on('joinRandom', (playerName) => {
      name = cleanName(playerName);
			if (!name){
				socket.emit('error');
				return;
			}
			socket['name'] = name;
			waiting.push(socket);
			socket.emit('waiting');
			console.log('waiting', waiting.length);
			if (waiting.length >= numpeople) {
				roomId = Math.round(Math.random()*1e10);
				rooms[roomId] = new Room(roomId, waiting.splice(0, numpeople));
				for (let s of rooms[roomId].players){
					s.join(roomId);
					stor[s.id] = roomId;
				}
				rooms[roomId].start();
			}
		});

		socket.on('chat', message => {
			let group = stor[socket.id];
			rooms[group].sendChat(name, message);
		});

		
		socket.on('disconnect', () => {
			if (socket.id in stor){
				let group = stor[socket.id];
				socket.leave(group);
				ind = rooms[group].players.indexOf(socket);
				delete rooms[group].players[ind];
				if (rooms[group].players.length == 0) delete rooms[group];
				delete stor[socket.id];
			}
			else {
				if (waiting.includes(socket)){
					waiting.splice(waiting.indexOf(socket), 1);
				}
			}
		});
		
	});
}
