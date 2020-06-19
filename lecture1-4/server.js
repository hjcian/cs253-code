const express = require('express')
const { createReadStream } = require('fs')
// SAME AS
// const fs = require('fs')
// const createReadStream = fs.createReadStream
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const USERS = {
  max: '123',
  john: '321'
}

const BALANCES = {
  max: 100,
  john: 500
}

// SESSIONS solution
const SESSIONS = {}
let nextSessionId = 0

const COOKIES_SECRET = 'sljgnjselghoi'
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(COOKIES_SECRET))

app.get('/', (req, res) => {
  // const username = req.cookies.username
  // const username = req.signedCookies.username
  // const username = SESSIONS[req.cookies.sessionID]
  const username = SESSIONS[req.signedCookies.sessionID]
  console.log('login from:', username, req.cookies.sessionID)
  if (USERS[username]) {
    res.send(`
    Hi ${username}! Amount: ${BALANCES[username]}
    <br>
    <a href='/logout'> Logout </a>
    `)
  } else {
    createReadStream('index.html').pipe(res)
  }
})

app.post('/login', (req, res) => {
  console.log(req.body)
  const username = req.body.username
  if (USERS[username] === req.body.password) {
    // res.cookie('username', username, { signed: true })
    // res.cookie('sessionID', nextSessionId)
    res.cookie('sessionID', nextSessionId, { signed: true })
    SESSIONS[nextSessionId] = username
    nextSessionId += 1

    res.redirect('/')
    // res.send('nice!')
  } else {
    res.send('failed!')
  }
})

app.get('/logout', (req, res) => {
  // res.clearCookie('username')
  // const sessionID = req.cookies.sessionID
  const sessionID = req.signedCookies.sessionID
  delete SESSIONS[sessionID]
  res.clearCookie('sessionID')
  res.redirect('/')
})

app.listen(4000)
