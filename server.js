const express = require('express');
const path = require('path');//this is the way to do a local on the html route, with this we can find the path of the files
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const app = express();
//client -> middleware (pre-processing before give to the server app.use() -> server
// Import custom middleware, "cLog"
// Middleware for parsing JSON and urlencoded form data
//data parser in app.use to parse client data to req.body(original client data object)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware to modular api routes
//modulize: breakdown  api route in separate files
//http:/localhost:3001/api  (this is api base)
app.use('/api', api);
//middleware to make public the homepage url http://localhost:3001
app.use(express.static('public'));
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// Wildcard route to direct users to a index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);