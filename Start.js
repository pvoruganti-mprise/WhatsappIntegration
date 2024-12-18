const dotenv = require('dotenv')
dotenv.config({path: './.env'})
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


app.get('/', async (req, res) => {
//  res.sendFile(__dirname + '/index.html');
console.log(process.env);
res.send(process.env.NAME);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
