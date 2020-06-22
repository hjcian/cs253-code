var http = require('http')
var bl = require('bl')

var url = process.argv[2]

// approache 1
http.get(url, (response) => {
  response.setEncoding('utf8')
  let collect = ''
  response.on('error', function (err) {
    console.error(err)
  })
  response.on('data', function (data) {
    collect += data
  })
  response.on('end', function (data) {
    console.log(collect.length)
    console.log(collect)
  })
}).on('error', console.error)

// approache 2
// http.get(url, function (response) {
//   response.pipe(bl(function (err, data) {
//     if (err) throw err
//     data = data.toString()
//     console.log(data.length)
//     console.log(data)
//   }))
// })
