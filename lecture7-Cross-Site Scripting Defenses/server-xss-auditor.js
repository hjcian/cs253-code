const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const htmlEscape = require('html-escape')
const { randomBytes } = require('crypto')

const app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

const USERS = { alice: 'password', bob: '1234' }
const BALANCES = { alice: 500, bob: 100 }
const SESSIONS = {}

app.get('/', (req, res) => {
  console.log('entry /')

  const username = SESSIONS[req.cookies.sessionId]
  const source = htmlEscape(req.query.source)

  if (username) {
    res.send(`
      <h1>
        Hi <span id='username'></span>
        Your balance is ${BALANCES[username]}
      </h1>
      <form method='POST' action='/transfer'>
        Send amount: <input name='amount' />
        To user: <input name='to' />
        <input type='submit' value='Send' />
      </form>
    
      <script> 
        if (window.top.location != window.location) {
            window.top.location = window.location
        }
      </script>
      `)
  } else {
    res.send(`
    <h1> 
        ${source ? `Hi ${source} reader!` : ''}
        Login to your bank account:
    </h1>
    <form method='POST' action='/login'>
        Username: <input name='username' />
        Password: <input name='password' type='password' />
        <input type='submit' value='Login' />
    </form>

    <script> 
        if (window.top.location != window.location) {
            window.top.location = window.location
        }
    </script>
      `)
  }
})

app.post('/login', (req, res) => {
  console.log('entry login')
  const username = req.body.username
  const password = USERS[username]
  if (password === req.body.password) {
    const sessionId = randomBytes(16).toString('hex')
    SESSIONS[sessionId] = username
    console.log(`SESSIONS: ${JSON.stringify(SESSIONS, null, 2)}`)
    res.cookie('sessionId', sessionId)
    res.redirect('/')
  } else {
    res.send('fail!')
  }
})

app.post('/transfer', (req, res) => {
  const sessionId = req.cookies.sessionId
  const username = SESSIONS[sessionId]
  if (!username) {
    res.send('fail!')
    return
  }
  const amount = Number(req.body.amount)
  const to = req.body.to
  BALANCES[username] -= amount
  BALANCES[to] += amount
  res.redirect('/')
})

app.listen(4000)
