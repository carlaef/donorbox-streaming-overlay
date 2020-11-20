const express = require('express');
const router = express.Router();

function eventsHandler(req, res, next) {
  // Mandatory headers and http status to keep connection open
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);
  res.write('event: hello\n\n');
  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);
  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(c => c.id !== clientId);
  });
}

function sendEventsToAll(donation) {
  clients.forEach(c => c.res.write(`event: donation\ndata: ${JSON.stringify(donation)}\n\n`))
}

function addDonation(req, res, next) {
  res.json({result: 'ok'});
  return sendEventsToAll(req.body);
}

router.get('/events', eventsHandler);
router.post('/webhook', addDonation);

let clients = [];

module.exports = router;
