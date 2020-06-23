const net = require('net')
const strftime = require('strftime')

const portNumber = process.argv[2]

const server = net.createServer(function (socket) {
  const ret = strftime('%Y-%m-%d %H:%M') + '\n'
  socket.write(ret)
  socket.end()
})

server.listen(portNumber)
