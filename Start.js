const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const { send } = require('process')
//const NtlmClient = require('node-client-ntlm').NtlmClient
var bodyParser = require('body-parser')
const Verify = require('twilio/lib/rest/Verify')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const NTLMCLIENT = new NtlmClient()
app.get('/', async (req, res) => {
console.log(process.env);
res.send(process.env.NAME);
})

app.post('/ReceiveMessage', async (req, res) => {
  const { body } = req
  let mobilenumber = body.From
  mobilenumber = mobilenumber.substring(9);
  console.log(body.Body);
  res.send(
    `${process.env.USER}
    ,${process.env.PASSWORD}
    ,${process.env.WORKSTATION}
    ,${process.env.URL}
    ${process.env.DOMAIN}`
  )
});

function sendmessage (message, mobileNumber) {
  NTLMCLIENT.request(
    {
      url: `${process.env.URL}`,
      method: 'POST',
      body: JSON.stringify({
        mobileNumber: `${mobileNumber}`,
        message: `${message}`
      }),
      headers: {
        'content-type': 'application/json',
        vary: 'Accept-Encoding',
        server: 'Microsoft-HTTPAPI/2.0',
        connection: 'keep-alive',
        Accept: '*/*'
      }
    },
    `${process.env.USER}`,
    `${process.env.PASSWORD}`,
    `${process.env.WORKSTATION}`,
    `${process.env.DOMAIN}`
  )
    .then(response => {
      console.log('Content body of the response', response.body)
    })
    .catch(error => {
      console.error(error)
    })
}



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
