const fs = require('fs')

const fpath = process.argv[2]

const fileBuffer = fs.readFileSync(fpath)
const fileString = fileBuffer.toString()
const lines = fileString.split('\n')
// console.log(lines)
console.log(lines.length - 1)
