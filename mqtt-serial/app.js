const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost", [{ host: 'localhost', port: 1883 }]);
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM4', baudRate: 9600 }, function (err) {
    if (err) {
      return console.log('Error: ', err.message)
    }
  })
  
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
  

client.on("connect", () => {
    parser.on('data', (message) => {
        let value = message.split('=')[1] * 1
        console.log(value)
        client.publish("capacity", JSON.stringify({
            capacity: ((value * 100) /1024).toFixed(2)
        }));

    })
    // setInterval( () => {
    //     let value = random(10, 100)
    //     client.publish("capacity", JSON.stringify({
    //         capacity: value
    //     }));
    // }, 500)
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
//   client.end();
});

function random(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }