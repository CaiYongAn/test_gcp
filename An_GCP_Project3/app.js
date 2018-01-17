var WebSocketServer = require('ws').Server;
var appengine = require('appengine');
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(appengine.middleware.base);
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

// for back -> front  
var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws){
  console.log('socket connected');  
  var id = setInterval(function () {
      // JSON.stringify() method converts a JavaScript value to a JSON string,
      console.log('(send from server-json):' + JSON.stringify(process.memoryUsage()));
      // console.log('(send from server):%j', process.memoryUsage()); 
      ws.send(JSON.stringify(process.memoryUsage()), function () { /* ignore errors */ });  
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
      //   ,function () { /* ignore errors */ }); 

      sensorData =  { "id": "sensor01" , "value": getRandomInt(1,10)}
      ws.send(
         JSON.stringify(sensorData) ,function () { /* ignore errors */ }); 

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


// Imports the Google Cloud client library
const Bigtable = require('@google-cloud/bigtable');

// Creates a client
const bigtable = new Bigtable();

// The name for the new instance
const instanceName = 'an-bigtable-test1';
const tableName = 'weather';

// // Creates the new instance
// bigtable
//   .createInstance(instanceName, {
//     clusters: [
//       {
//         name: 'an-cluster-1',
//         location: 'asia-east1-a',
//         nodes: 3,
//       },
//     ],
//   })
//   .then(() => {
//     console.log(`Instance ${instanceName} created.`);
//   })
//   .catch(err => {
//     console.log('ERROR:', err);
//   });
 
const options = {
  families: ['cf1']
};

const instance = bigtable.instance(instanceName); //my-instance
instance.createTable(tableName, options, function(err, table) {});
const table = instance.table(tableName);
 
table.createReadStream()
  .on('error', console.error)
  .on('data', function(row) {
    // `row` is a Row object.  
    console.log(row.data.cf1.tmp); 
  });






// table.createFamily('sensors', function(err, family) {
//   // `family` is your newly created Family object.
// });

// const rows = [
//   {
//     key: 'time:1',
//     data: {
//       follows: {
//         tjefferson: 1
//       }
//     }
//   }
// ];

// table.insert(rows, function(err) {
//   console.log('done insert:' + rows); 
//   if (!err) {
//     // Your rows were successfully inserted.
//     console.log(err); 
//   }
// });




// const callback2 = function(err, rows) {
//   // `rows` is an array of Row objects.
// };
// const options2 = {
//   start: 'time:1',
//   end: 'time:2'
// };

// table.getRows(options2, callback2);

// const row = table.row('time:1');

// row.get(function(err) { 
// });
// console.log(row.data); 


// const callback = function(err, instance, operation) {
//   operation
//     .on('error', console.log)
//     .on('complete', function() {
//       // `instance` is your newly created Instance object.
//     });
// };

// const instance = bigtable.instance('an-instance-1'); //my-instance

// instance.create({
//   clusters: [
//     {
//       name: 'my-cluster',
//       location: 'us-east-1',
//       nodes: 3
//     }
//   ]
// }, callback);
// instance.createTable('prezzy', function(err, table) {
//   // `table` is your newly created Table object.
// });


// const table = instance.table('prezzy');

// table.createFamily('follows', function(err, family) {
//   // `family` is your newly created Family object.
// });
// const options = {
//   families: ['follows']
// };

// instance.createTable('prezzy', options, function(err, table) {});
// const rows = [
//   {
//     key: 'wmckinley',
//     data: {
//       follows: {
//         tjefferson: 1
//       }
//     }
//   }
// ];

// table.insert(rows, function(err) {
//   if (!err) {
//     // Your rows were successfully inserted.
//   }
// });

// table.createReadStream()
//   .on('error', console.error)
//   .on('data', function(row) {
//     // `row` is a Row object.  
//     // console.log(row.); 
//   });

