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

const NTLMCLIENT = new NtlmClient()
app.post('/', async (req, res) => {
NTLMCLIENT.request(
  {
    url: `http://mprise-pc-14.mprise.lunitehosting.net:7048/BC240/ODataV4/Company('Agriware%20Testbedrijf%20-%20BREED')/whatsappMessages`,
    method: 'POST',
    body: JSON.stringify({
      mobileNumber: '+917989865497',
      message: 'Hello'
    }),
    headers: {
      'content-type': 'application/json',
      vary: 'Accept-Encoding',
      server: 'Microsoft-HTTPAPI/2.0',
      connection: 'keep-alive',
      Accept: '*/*'
    }
  },
  'pvoruganti',
  'Wednesday14#',
  'mprise-pc-14.mprise.lunitehosting.net',
  'mprise'
)
  .then(response => {
    console.log('Content body of the response', response.body)
  })
  .catch(error => {
    console.log(error)
  })
})

app.post('/ReceiveMessage', async (req, res) => {
  const { body } = req
  let mobilenumber = body.From
  mobilenumber = mobilenumber.substring(9);
  console.log(body.Body);
  res.send(body);
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
