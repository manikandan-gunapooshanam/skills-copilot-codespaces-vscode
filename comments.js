// create web server
const express = require('express');
const app = express();
const port = 3000;

// use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// use the comments module
const comments = require('./comments');

// get all comments
app.get('/comments', (req, res) => {
  res.json(comments.getAll());
});

// get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.get(req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Not Found');
  }
});

// add a new comment
app.post('/comments', (req, res) => {
  const id = comments.add(req.body);
  res.header('Location', '/comments/' + id);
  res.status(201).send('Created');
});

// update a comment
app.put('/comments/:id', (req, res) => {
  if (comments.update(req.params.id, req.body)) {
    res.status(200).send('OK');
  } else {
    res.status(404).send('Not Found');
  }
});

// delete a comment
app.delete('/comments/:id', (req, res) => {
  if (comments.remove(req.params.id)) {
    res.status(204).send('No Content');
  } else {
    res.status(404).send('Not Found');
  }
});

// start the server
app.listen(port, () => {
  console.log('Server is running on port', port);
});