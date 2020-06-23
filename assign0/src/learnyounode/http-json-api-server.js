// TODO: Replace this with your solution.
const http = require('http')
const url = require('url')

const portNumber = process.argv[2]

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  const urlObj = new url.URL(req.url, 'http://127.0.0.1')
  const iso = urlObj.searchParams.get('iso')
  const date = new Date(iso)

  let data = ''
  if (urlObj.pathname === '/api/parsetime') {
    data = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  } else if (urlObj.pathname === '/api/unixtime') {
    data = {
      unixtime: date.getTime()
    }
  }
  res.end(JSON.stringify(data, null, 4))
})
server.listen(portNumber)
