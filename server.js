var PORT = process.argv[2];

var dgram = require('dgram');
var rl = require('readline');
var server = dgram.createSocket('udp4');
var client = dgram.createSocket('udp4');
var clientport, clientaddr;

server.on('message', function (msg, rinfo) {
  console.log(msg.toString());
  rl.prompt();
  clientaddr = rinfo.address;
  clientport = rinfo.port;
});

server.on('listening', function () {
  var address = server.address();
  console.log('\nserver listening ' +
    address.address + ':' + address.port);
  rl = rl.createInterface(process.stdin, process.stdout, null); 
  rl.prompt();

  rl.on('line', function (cmd) {
    if (!clientaddr) {
      console.log('\nPatience...no clients have connected.');
      rl.prompt();
      return;
    }
    console.log(cmd);
    var outstr = new Buffer(cmd);
    client.send(outstr, 0, outstr.length, clientport, clientaddr, function(err, bytes) {
    });
    rl.prompt();
  });
});

server.bind(PORT);
