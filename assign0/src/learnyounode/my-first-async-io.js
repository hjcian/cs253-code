const fs = require('fs')

const fpath = process.argv[2]

fs.readFile(fpath, 'utf8', function (err, data) {
  if (err) throw err
  console.log(data.split('\n').length - 1)
})
