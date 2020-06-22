const mymodule = require('./mymodule.js')
const fpath = process.argv[2]
const ext = process.argv[3]

mymodule(fpath, ext, (err, files) => {
  if (err) throw err
  for (let i = 0; i < files.length; i++) {
    console.log(files[i])
  }
})
