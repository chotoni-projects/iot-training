const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost", [{ host: 'localhost', port: 1883 }]);

client.on("connect", () => {
    setInterval( () => {
        let value = random(10, 100)
        client.publish("capacity", JSON.stringify({
            capacity: value
        }));
    }, 500)
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