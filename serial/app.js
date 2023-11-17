const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM4', baudRate: 9600 }, function (err) {
    if (err) {
      return console.log('Error: ', err.message)
    }
  })
  
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
  parser.on('data', console.log)

// var main = async () => {
//     var a = await SerialPort.list()
// console.log(a)
// }
// main()