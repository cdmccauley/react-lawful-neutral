const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3030;

app.locals.hosts = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/join', (req, res) => {
  let roomId = String(req.body.post);
  res.send({ roomId: roomId});
});

app.get('/api/host', (req, res) => {
  let hostId = app.locals.hosts.length + 1;
  let hostInfo = 'hostInfo';
  let host = JSON.parse('{"'+ hostId + '":"' + hostInfo + '"}');
  app.locals.hosts.push(host);
  res.send({ hostId: hostId });
});

// app.post('/api/host', (req, res) => {
//   // TODO: verify and scrub data
//   // build data
//   let hostID = String(req.body.post);
//   let hostInfo = "hostInfo"
//   let host = JSON.parse('{"'+ hostID + '":"' + hostInfo + '"}');
//   // store data
//   app.locals.hosts.push(host);
//   // DEBUG: log hosts data
//   console.log(app.locals.hosts);
// });

app.listen(port, () => console.log(`listening on port ${ port }`));