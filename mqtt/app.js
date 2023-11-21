const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost", [{ host: 'localhost', port: 1883 }]);
const { SerialPort } = require('serialport')
const { ReadlineParser } =require('@serialport/parser-readline')

const port = new SerialPort({ path:'COM4', baudRate: 9600 })
const parser = port.pipe( new ReadlineParser({ delimiter: '\r\n'}))


client.on("connect", () => {
  
  parser.on('data', function(message) {
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