// TODO: Replace this with your solution.
const http = require('http')
const map = require('through2-map')

const portNumber = process.argv[2]

const server = http.createServer(function (req, res) {
  if (req.method !== 'POST') {
    return res.end('send me a POST\n')
  }
  console.log(req.read())
  console.log(req.url)
  let data = ''
  req.on('data', function (chunk) {
    data += chunk.toString()
  })
  req.on('end', function () {
    console.log(data)
  })
  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})
server.listen(portNumber)
