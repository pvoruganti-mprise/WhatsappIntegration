const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const { send } = require('process')
const NtlmClient = require('node-client-ntlm').NtlmClient
var bodyParser = require('body-parser')
const Verify = require('twilio/lib/rest/Verify')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/ConfirmationMessage', async (req, res) => {
 res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
