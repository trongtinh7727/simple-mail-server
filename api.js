const express = require('express');
const { emails } = require('./emails');

const app = express();
const PORT = 54321;

app.get('/emails', (req, res) => {
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`Web server running at ${PORT}`);
});