const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const { send } = require('process');

const accountSid = 'ACdb917e60e66a4a6565f4045548fe8143';
  const authToken = '884a9f3904600c20c557751a6a4eef66';
  const client = require('twilio')(accountSid, authToken);

  var sid = 'VAca7c5195702f4c2219dcc45858da0d18';
  var PhoneNumber;
  
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/sendMessage', async (req, res) => {
  sendmessage();
});
app.get('/PhoneNumber', async (req, res) => {
  res.sendFile(path.join(__dirname, 'PhoneNumberInput.html'));
});

app.get('/VerifyOTP', async (req, res) => {
  PhoneNumber = req.query.MobileNumber;
  console.log(PhoneNumber);
  createVerification(PhoneNumber);
  res.sendFile(path.join(__dirname, 'VerifyOtp.html'));
});


app.get('/CheckOTP', async (req, res) => {
  let OTP = req.query.otp;
  console.log(OTP);
  VerificationCheck(OTP);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function sendmessage()
{
  client.messages
      .create({
          body: 'Your appointment is coming up on July 21 at 3PM',
          from: 'whatsapp:+14155238886',
          to: `whatsapp:+917989865497`
      })
      .then(message => console.log(message.sid))
}  

async function createService() {
  const service = await client.verify.v2.services.create({
    friendlyName: "My First Verify Service",
  });
  console.log(service,'Hello');
  createVerification(service.sid);
}

async function createVerification() {
  const verification = await client.verify.v2
    .services(sid)
    .verifications.create({
      channel: "whatsapp",
      to:`+${PhoneNumber}`,
    });
  console.log(verification.status);
}

  async function VerificationCheck(OTP) {
    const verificationCheck = await client.verify.v2
      .services(sid)
      .verificationChecks.create({
        code: OTP,
        to:`+${PhoneNumber}`,
      });
    console.log(verificationCheck.status);

  }

