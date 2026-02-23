const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "M@Tdaibang88";
const PAGE_ACCESS_TOKEN = "EAAXxodkRfeYBQxcCeEqMiNonPS4bpB2VphZCTa7WLGKdCdz0ZBz2E7rZADZAzJ1n41XUqyUmLkzOWzuisfwtl9qtlcUNvpMrr7RwLEqVOoj6ZCeA0yv5scYW3u2SoXPA58ZBRICIX68iO3vVqFrkR0NdZAmcHQaBTUELoKeI51HEcVWTFKohjnz8K0pYwojeTTWPXpZA9rqenQZDZD";

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
