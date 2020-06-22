var http = require('http')
var bl = require('bl')

var urls = process.argv.slice(2)
const output = []

// function request (url, index) {
//   http.get(url, function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err) throw err
//       data = data.toString()
//       //   console.log(data.length)
//       //   console.log(data)
//       output[index] = data
//       if (output.length === urls.length) {
//         console.log(output.length)
//         console.log(urls.length)
//         for (let i = 0; i < output.length; i++) {
//           console.log(output[i])
//         }
//       }
//     }))
//   })
// }

for (let index = 0; index < urls.length; index++) {
  const url = urls[index]
  http.get(url, function (response) {
    response.pipe(bl(function (err, data) {
      if (err) throw err
      data = data.toString()
      //   console.log(data.length)
      //   console.log(data)
      output[index] = data
      if (output.length === urls.length) {
        for (let i = 0; i < output.length; i++) {
          console.log(output[i])
        }
      }
    }))
  })
}

// var output = []
// var urls = process.argv.slice(2)

// function printData (output) {
//   for (var i = 0; i < output.length; i++) {
//     console.log(output[i])
//   }
// }

// function makeRequest (url, index) {
//   http.get(url, function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err) {
//         return console.error(err)
//       }

//       output[index] = data.toString()

//       if (output.length === urls.length) {
//         printData(output)
//       }
//     }))
//   })
// }

// for (var i = 0; i < urls.length; i++) {
//   makeRequest(urls[i], i)
// }
