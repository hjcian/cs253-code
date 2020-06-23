const http = require('http')
const fs = require('fs')

const portNumber = process.argv[2]
const filepath = process.argv[3]

const readStream = fs.createReadStream(filepath)

const server = http.createServer(function (req, res) {
  readStream.pipe(res)
})
server.listen(portNumber)
