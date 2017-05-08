

let frame_time = 60/1000; // run the local game at 16ms / 60hz
if ('undefined' != typeof(global)) {
  frametime = 45/1000;
}


class GameCore {
  constructor(gameInstance) {
    this.instance = gameInstance; // store instance, if any
    this.server = this.instance !== undefined; // store a flag if were are the server

    this.world = {
      width: 5000,
      height: 5000
    }

    this.players = {};

    this._pdt = 0.0001; // The physics update delta time
    this._pdte = new Date().getTime(); // physics update last delta time
    this.localTime = 0.016; // the local timer
    this._dt = new Date().getTime(); // The local timer delta
    this._dte = new Date().getTime(); // The local last frame time

    // Start a physic loop, this is separate to the rendering as this happens at a
    // fixed frequency
    this.createPhysicsSimulation();

    // Start a fast paced timer for measuring time easier
    this.createTimer();

    // Client specific initialization
    if (!this.server) {
      // !!! create a mouse and keyboard handler

      // Create the default configuration settings
      this.clientCreateConfiguration():

      // A list of recent server updates we interpolate across
      // This is the buffer that is the driving factor for our networking
      this.serverUpdates = [];

      // Connect to the socket.io server
      this.clientConnectToServer();

      // We start pinging the server to determine latency
      this.clientCreatePingTimer();



    } else {
      this.serverTime = 0;
      this.lastState = {};
    }
  }

  update(t) {
    this.dt = this.lastFrameTime ? ((t - this.lastFrameTime)/1000.0).fixed() : 0.016;

    this.lastFrameTime = t;
    if (!this.server) {
      this.clientUpdate();
    } else {
      this.serverUpdate();
    }

    this.updateId = window.requestAnimationFrame(this.update.bind(this))
  }

  // Make sure things run smoothly and notifies clients of changes on the server side
  serverUpdate() {
    // Update the state of our local clock to match the timer
    this.serverTime = this.localTime;

    this.lastState = {
      positions: Object.values(this.players).forEach((p) => p.pos), // player positions
      inputSeqs: Object.values(this.players).forEach((p) => p.lastInputSeq), // player last input sequences
      t: this.serverTime
    };

    Object.values(this.players).forEach((player) => {
      player.instance.emit('onserverupdate', this.lastState);
    })
  }

  createTimer() {
    setInterval(() => {
      this._dt = new Date().getTime() - this._dte;
      this._dte = new Date().getTime();
      this.localTime += this._dt/1000.0;
    }, 4);
  }

  createPhysicsSimulation() {
    setInterval(() => {
      this._pdt = (new Date().getTime() - this._pdte)/1000.0;
      this._pdte = new Date().getTime();
      this.updatePhysics();
    }, 15);
  }

  updatePhysics() {
    if (this.server) {
      this.serverUpdatePhysics();
    } else {
      this.clientUpdatePhysics();
    }
  }

  // Updated at 15ms, simulates the world state
  serverUpdatePhysics() {
    Object.values(this.players).forEach((player) => {
      this.processInput(player);
    })
  }

  clientUpdatePhysics() {

  }

  processInput(player) {
    const ic = player.inputs.length;

    if (ic) {
      for (let i = 0; i < ic; i++) {
        if (player.inputs[i].seq <= player.lastInputSeq) {
          continue;
        }

        const input = player.inputs[i].inputs;
        const c = input.length;

      }
    }
  }

  serverHandleInput(client, input, inputTime, inputSeq) {
    const playerClient = this.players[client.userId];
    playerClient.inputs.push({inputs: input, time: inputTime, seq: inputSeq})
  }

  clientHandleInput() {
    const input = [];
    this.clientHasInput = false;
    document.addEventListener('mousemove', (e) => {

    });
  }

  clientCreatePingTimer() {
    setInterval(() => {
      this.lastPingTime = new Date().getTime();
      this.socket.send('p.' + (this.lastPingTime))
    }, 1000);
  }

  clientOnConnected(data) {
    this.players[data.id] = {
      id: data.id,
      state: 'connected',
      online: 'true',
      infoColor: '#cc0000'
    }
  }

  clientOnPing(data) {
    this.netPing = new Date().getTime() - parseFloat(data);
    this.netLatency = this.netPing/2;
  }

  clientConnectToServer() {
    this.socket = io();

    // Handle when we connect to the server, showing state and storing id's
    this.socket.on('onconnected', this.clientOnConnected.bind(this));
    // Sent each tick of the server simulation. This is our authoritative update
    this.socket.on('onserverupdate', this.clientOnServerUpdateReceived.bind(this));
    // On message from the server, we parse the commands and send it to the handlers
    this.socket.on('message', this.clientOnNetMessage.bind(this));
  }


}
