const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost", [{ host: 'localhost', port: 1883 }]);
const { SerialPort } = require('serialport')
const { ReadlineParser } =require('@serialport/parser-readline')

const port = new SerialPort({ path:'COM6', baudRate: 9600 })
const parser = port.pipe( new ReadlineParser({ delimiter: '\r\n'}))
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'iot'
});
var moment = require('moment')
function formatDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

client.on("connect", () => {
  
  parser.on('data', function(message) {
    pool.query('INSERT INTO iot.logging VALUES ("'+ message +'", "'+ formatDate(new Date()) +'")', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
    });
    console.log('Sensor:' + message)
    client.publish("capacity", JSON.stringify({
        capacity: ((message * 100) / 1023).toFixed(2)
    }));
  })

    
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
//   client.end();
});

function random(min, max)  {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }