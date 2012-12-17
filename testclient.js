var PORT = parseInt(process.argv[3], 10) || 8090;
var HOST = process.argv[2] || 'localhost';
var rl = require('readline');
var dgram = require('dgram');
var client = dgram.createSocket("udp4");
console.log(HOST, PORT);

rl = rl.createInterface(process.stdin, process.stdout, null);
rl.prompt();
rl.on('line', function (cmd) {
  console.log(cmd);
  var outstr = new Buffer(cmd);
  client.send(outstr, 0, outstr.length, PORT, HOST, function(err, bytes) {
});
  rl.prompt();
});

client.on('message', function(msg, rinfo) {
  console.log(msg.toString());
  rl.prompt();
});
