// TODO: Replace this with your solution.
const fs = require('fs')
const path = require('path')
const fpath = process.argv[2]
const ext = process.argv[3]

fs.readdir(fpath, function (err, files) {
  if (err) throw err
  files.forEach(file => {
    if (path.extname(file).endsWith(ext)) {
      console.log(path.basename(file))
    }
  })
})
