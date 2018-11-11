const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3030;

app.locals.hosts = [{"initHost": "hostInfo"}];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ key: app.locals.hosts });
});

app.post('/api/world', (req, res) => {
  // TODO: verify and scrub data
  // build data
  let hostID = String(req.body.post);
  let hostInfo = "hostInfo"
  let host = JSON.parse('{"'+ hostID + '":"' + hostInfo + '"}');
  // store data
  app.locals.hosts.push(host);
  // DEBUG: log hosts data
  console.log(app.locals.hosts);
});

app.listen(port, () => console.log(`listening on port ${ port }`));