const fs = require('fs')
const path = require('path')

module.exports = function (directory, extension, callback) {
  fs.readdir(directory, function (err, files) {
    if (err) {
      return callback(err, null)
    }
    const filtered = []
    files.forEach(file => {
      if (path.extname(file).endsWith(extension)) {
        //   console.log(path.basename(file))
        filtered.push(path.basename(file))
      }
    })
    callback(null, filtered)
  }
  )
}
