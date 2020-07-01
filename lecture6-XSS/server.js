const express = require('express')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { randomBytes } = require('crypto')
const htmlEscape = require('html-escape')

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
  const source = htmlEscape(req.query.source)

  console.log('source:', source)
  const username = SESSIONS[req.signedCookies.sessionID]
  console.log('login from:', username, req.cookies.sessionID)
  if (USERS[username]) {
    res.send(`
    Hi ${username}! Amount: ${BALANCES[username]}
    <br>
    You're come from ${source !== undefined ? `from ${source}` : ''}
    <br>
    <form method='POST' action='/transfer' >
      
      To User:
      <input name='to' />
    
      Amount:
      <input name='amount' />      
      <input type='submit' value='Send' />
    
    </form>
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
    nextSessionId = randomBytes(16).toString('base64')
    res.cookie('sessionID', nextSessionId, {
      signed: true,
      sameSite: 'lax'
    })
    SESSIONS[nextSessionId] = username

    res.redirect('/')
  } else {
    res.send('failed!')
  }
})

app.post('/transfer', (req, res) => {
  const sessionID = req.signedCookies.sessionID
  const username = SESSIONS[sessionID]

  if (!username) {
    res.send('failed!')
    return
  }

  const amount = Number(req.body.amount)
  const to = req.body.to

  if (!to || !USERS[to]) {
    res.send('No User!')
    return
  }

  BALANCES[username] -= amount
  BALANCES[to] += amount
  res.redirect('/')
})

app.get('/logout', (req, res) => {
  const sessionID = req.signedCookies.sessionID
  delete SESSIONS[sessionID]
  res.clearCookie('sessionID', {
    sameSite: 'lax'
  })
  res.redirect('/')
})

app.listen(4000)
