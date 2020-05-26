// =================================================================
// Slide title: Demo: EJS escaping
// =================================================================

const express = require('express')
const ejs = require('ejs')

const app = express()

// demo: http://localhost:4000/?name=<script>alert('Hi')</script>
// will show different results in two different ways
app.get('/', async (req, res) => {
  const name = req.query.name || 'Person'

  // Now we are escaping
  //   <%= Outputs the value into the template (HTML escaped)
  //
  const template = `
    <h1> Hi, <%= name %> </h1>
       `

  // Change the equal sign, we not not escaping the user input
  //   <%- Outputs the unescaped value into the template
  //
  //   const template = `
  //     <h1> Hi, <%- name %> </h1>
  //        `

  const html = ejs.render(template, { name })

  res.send(html)
})

app.listen(4000)
