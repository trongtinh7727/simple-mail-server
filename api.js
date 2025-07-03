const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 54321;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/emails', async (req, res) => {
  try {
    const emails = await db.getAllEmails();
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

app.get('/emails/:id', async (req, res) => {
  try {
    const email = await db.getEmailById(req.params.id);
    if (email) {
      res.json(email);
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch email' });
  }
});

app.delete('/emails/:id', async (req, res) => {
  try {
    const result = await db.deleteEmail(req.params.id);
    if (result) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete email' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running at ${PORT}`);
});