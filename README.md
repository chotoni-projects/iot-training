# iot-training

cd C:\Program Files\mosquitto\mosquitto.exe
mosquitto -c mosquitto.conf
restart mosquitto service

https://www.npmjs.com/package/mqtt#install


create app.js
npm init
npm install mqtt


create index.js index.html index.css
https://eclipse.dev/paho/index.php?page=clients/js/index.php



QoS 0 : received at most once : The packet is sent, and that's it. There is no validation about whether it has been received.
QoS 1 : received at least once : The packet is sent and stored as long as the client has not received a confirmation from the server. MQTT ensures that it will be received, but there can be duplicates.
QoS 2 : received exactly once : Same as QoS 1 but there is no duplicates.

