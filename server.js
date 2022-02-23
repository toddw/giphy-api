const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const twilio = require("twilio");

const token = process.env.TWILIO_AUTH_TOKEN;
const sid = process.env.TWILIO_ACCOUNT_SID;
const from = process.env.TWILIO_FROM_NUMBER;

app.use(bodyParser.json());

const client = twilio(sid, token, {
  lazyLoading: true
});

app.post("/sms", (req, res) => {
  (async () => {
    const message = await client.messages.create({
      body: req.body.message,
      from,
      to: req.body.to
    });

    res.end(JSON.stringify(message));
  })();
});

app.listen(process.env.PORT || 3000);
