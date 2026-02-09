const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  db.query('SELECT * FROM contacts WHERE user_id = ?', [req.user.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', auth, (req, res) => {
  const { name, phone, email } = req.body;
  db.query('INSERT INTO contacts (user_id, name, phone, email) VALUES (?, ?, ?, ?)',
    [req.user.id, name, phone, email], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Contact added' });
    });
});

router.put('/:id', auth, (req, res) => {
  const { name, phone, email } = req.body;
  db.query('UPDATE contacts SET name=?, phone=?, email=? WHERE id=? AND user_id=?',
    [name, phone, email, req.params.id, req.user.id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Contact updated' });
    });
});

router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM contacts WHERE id=? AND user_id=?', [req.params.id, req.user.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Contact deleted' });
  });
});

module.exports = router;
