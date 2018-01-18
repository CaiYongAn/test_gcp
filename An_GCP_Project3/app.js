var WebSocketServer = require('ws').Server;
// var appengine = require('appengine');
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
// app.use(appengine.middleware.base);
app.get('/_ah/health', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('ok');
});

app.get('/_ah/start', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('ok');
});

/*app.get('/_ah/stop', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('ok');
  process.exit();
});*/

var server = http.createServer(app);
server.on('request', app);
server.listen(8080, function () {
   console.log('Listening on http://localhost:8080');
 });

//server.listen(8080, '0.0.0.0');

// for back -> front  
/*
var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws){
  console.log('socket connected');  
  var id = setInterval(function () {
      // JSON.stringify() method converts a JavaScript value to a JSON string,
      console.log('(send from server-json):' + JSON.stringify(process.memoryUsage()));
      // console.log('(send from server):%j', process.memoryUsage()); 
      ws.send(JSON.stringify(process.memoryUsage()), function () {  });  
  }, 500);

  ws.on('message', function incoming(data){
    console.log('message received: '+data);
    ws.send('(send from server)you say: '+data);

    setTimeout(function timeout() {
      ws.send(Date.now());
    }, 500);
  });

  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });

  ws.on('error', function error(err){
    console.log('socket closed by error: '+err);
    ws.terminate();
  });
});

wss.on('error', function(err){
  console.log('server closed by error: '+err);
  server.close();
});

 
// for front -> back
// server.listen(8080, '0.0.0.0');
var wss2 = new WebSocketServer({host: '104.199.157.116', port: 443});
wss2.on('connection', function(ws){
  console.log('socket connected');  
  var id2 = setInterval(function () { 
      // splitSign = ','
      // ws.send(
      //   getRandomInt(1,10) + splitSign  + getRandomInt(1,10) + splitSign  + getRandomInt(1,10) + splitSign + getRandomInt(1,10)
      //   ,function () {   }); 

      sensorData =  { "id": "sensor01" , "value": getRandomInt(1,10)}
      ws.send(
         JSON.stringify(sensorData) ,function () {   }); 

  }, 500);

  ws.on('message', function incoming(data){
    console.log('message received: '+data);
    ws.send('(send from server)you say: '+data);
 
  });

  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id2);
  });

  ws.on('error', function error(err){
    console.log('socket closed by error: '+err);
    ws.terminate();
  });
});

wss2.on('error', function(err){
  console.log('server closed by error: '+err);
  server.close();
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

 */