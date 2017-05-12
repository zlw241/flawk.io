
const GameServer = require('./lib/server/game_server');


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const UUID = require('node-uuid');
const gameport = process.env.PORT || 5000;
const verbose = false;



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get( '/*' , ( req, res, next ) => {
      //This is the current file they have requested
  const file = req.params[0];
      //For debugging, we can track what files are requested.
  if(verbose) console.log('\t :: Express :: file requested : ' + file);
      //Send the requesting client the file.
  res.sendfile( __dirname + '/' + file );
});

http.listen(process.env.PORT || gameport, () => {
  console.log('\t :: Express :: Listening on port ' + gameport );
});


new GameServer(io);



// const players = {};
//
//
//
// io.on('connection', (socket) => {
//   socket.userId = UUID();
//   socket.join('game');
//   socket.emit('onconnected', {id: socket.userId, existingPlayers: players})
//   //Useful to know when someone connects
//   console.log('\t socket.io:: player ' + socket.userId + ' connected');
//   players[socket.userId] = {id: socket.userId, inputs: [], position: []};
//
//   socket.broadcast.emit("new player", players[socket.userId]);
//
//   socket.on('player position', (data) => {
//     players[socket.userId].inputs
//     players[socket.userId].position = data;
//     console.log(socket.userId, {id: socket.userId});
//   });
//
//   socket.on('disconnect', () => {
//     //Useful to know when someone disconnects
//     console.log('\t socket.io:: client disconnected ' + socket.userId);
//   });
//
//
//
// });
//
//  setInterval(() => {
//    io.emit('server update', players);
//  }, 1000);
