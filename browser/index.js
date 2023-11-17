document.addEventListener("DOMContentLoaded", (event) => {
    var location = {
        hostname: 'localhost',
        port: 8080
    }
    // Create a client instance
    client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({onSuccess:onConnect});


    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        client.subscribe("capacity");
    }

    // called when the client loses its connection
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:"+responseObject.errorMessage);
        }
    }

    // called when a message arrives
    function onMessageArrived(message) {
        let objMessage = JSON.parse(message.payloadString)
        chart.updateSeries([ objMessage.capacity * 1 ])
        // console.log("onMessageArrived:"+message.payloadString);
    }


    var options = {
      series: [],
      chart: {
        height: 350,
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter: function (val) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
      },
      stroke: {
        dashArray: 4
      },
      labels: ['Tank Capacity'],
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
      // chart.updateSeries([])
});