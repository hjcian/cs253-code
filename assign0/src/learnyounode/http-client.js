const http = require('http')

const url = process.argv[2]

http.get(url, (response) => {
  response.setEncoding('utf8')

  response.on('error', function (err) {
    console.error(err)
  })

  response.on('data', function (data) {
    console.log(data)
  })
}).on('error', console.error)
