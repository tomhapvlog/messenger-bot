const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

// ====== THAY 2 GIÁ TRỊ NÀY ======
const VERIFY_TOKEN = "M@Tdaibang88";
const PAGE_ACCESS_TOKEN = "EAAXxodkRfeYBQxcCeEqMiNonPS4bpB2VphZCTa7WLGKdCdz0ZBz2E7rZADZAzJ1n41XUqyUmLkzOWzuisfwtl9qtlcUNvpMrr7RwLEqVOoj6ZCeA0yv5scYW3u2SoXPA58ZBRICIX68iO3vVqFrkR0NdZAmcHQaBTUELoKeI51HEcVWTFKohjnz8K0pYwojeTTWPXpZA9rqenQZDZD";
// =================================


// ====== VERIFY WEBHOOK ======
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


// ====== NHẬN TIN NHẮN ======
app.post('/webhook', async (req, res) => {

  if (req.body.object === 'page') {

    for (const entry of req.body.entry) {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;

      if (webhook_event.message) {

        const userMessage = webhook_event.message.text;

        console.log("User message:", userMessage);

        await sendMessage(sender_psid, 
          `Anh vừa nhắn: "${userMessage}" 😎`
        );
      }

      if (webhook_event.postback) {
        await sendMessage(sender_psid, "Postback received 👍");
      }
    }

    res.status(200).send("EVENT_RECEIVED");

  } else {
    res.sendStatus(404);
  }
});


// ====== HÀM GỬI TIN NHẮN ======
async function sendMessage(psid, responseText) {

  const request_body = {
    recipient: { id: psid },
    message: { text: responseText }
  };

  try {
    await fetch(
      `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request_body)
      }
    );

    console.log("Message sent!");

  } catch (error) {
    console.error("Error sending message:", error);
  }
}


// ====== START SERVER ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> 22c83e858f9715a583d137c160eb9b83f41b4c78
