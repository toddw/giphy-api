const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const twilio = require('twilio');
const cors = require('cors');

const token = process.env.TWILIO_AUTH_TOKEN;
const sid = process.env.TWILIO_ACCOUNT_SID;
const from = process.env.TWILIO_FROM_NUMBER;

app.use(cors());
app.use(bodyParser.json());

const client = twilio(sid, token, {
  lazyLoading: true,
});

app.get('/', (req, res) => {
  res.end(
    "Twilio API POST to /sms {'to': '+1.......', '': 'message': '...message...'}",
  );
});

app.post('/sms', (req, res) => {
  (async () => {
    const message = await client.messages.create({
      body: req.body.message,
      from,
      to: req.body.to,
    });

    res.end(JSON.stringify(message));
  })();
});

module.exports = app;
