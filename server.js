// requires
const express = require('express');
const bodyParser = require('body-parser');

// declarations
const app = express();
const port = process.env.PORT || 3030;

// setup
app.locals.hosts = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST handlers
app.post('/api/join', (req, res) => {
  let roomId = String(req.body.post);
  res.send({ roomId: roomId});
});

// GET handlers
app.get('/api/host', (req, res) => {
  let hostId = app.locals.hosts.length + 1;
  let hostInfo = 'hostInfo';
  let host = JSON.parse('{"'+ hostId + '":"' + hostInfo + '"}');
  app.locals.hosts.push(host);
  res.send({ hostId: hostId });
});

// listen
app.listen(port, () => console.log(`listening on port ${ port }`));