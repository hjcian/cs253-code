const net = require('net')
const dns = require('dns')

dns.lookup('example.com', (err, address) => {
  if (err) throw err
  console.log(address)
  const socket = net.createConnection({
    host: address,
    port: 80
  })

  const req = `
GET / HTTP/1.1
Host: example.com

`

  socket.write(req)
  socket.pipe(process.stdout)
  socket.end()
})
