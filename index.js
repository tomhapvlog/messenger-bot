const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "M@Tdaibang88";

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  console.log("Incoming message:", JSON.stringify(req.body, null, 2));
  res.status(200).send("EVENT_RECEIVED");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
