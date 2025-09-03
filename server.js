const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));

// Serve frontend
app.use(express.static('public'));

// Helper: check auth
const requireAuth = (req, res, next) => {
  if (req.session.userId) next();
  else res.status(401).json({ error: 'Unauthorized' });
};

// Auth routes
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", username, password, function(err) {
    if (err) return res.json({ success: false, error: 'User exists' });
    res.json({ success: true });
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT id FROM users WHERE username = ? AND password = ?", username, password, (err, row) => {
    if (row) {
      req.session.userId = row.id;
      res.json({ success: true });
    } else res.json({ success: false });
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Product routes
app.post('/api/products', requireAuth, (req, res) => {
  const { name, price } = req.body;
  db.run("INSERT INTO products (name, price) VALUES (?, ?)", name, price, function(err) {
    if (err) return res.json({ success: false });
    res.json({ success: true, id: this.lastID });
  });
});

app.get('/api/products', requireAuth, (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => res.json(rows));
});

app.put('/api/products/:id', requireAuth, (req, res) => {
  const { name, price } = req.body;
  db.run("UPDATE products SET name = ?, price = ? WHERE id = ?", name, price, req.params.id, function(err) {
    if (err) return res.json({ success: false });
    res.json({ success: this.changes > 0 });
  });
});

// Customer routes (similar)
app.post('/api/customers', requireAuth, (req, res) => {
  const { name, email } = req.body;
  db.run("INSERT INTO customers (name, email) VALUES (?, ?)", name, email, function(err) {
    if (err) return res.json({ success: false });
    res.json({ success: true, id: this.lastID });
  });
});

app.get('/api/customers', requireAuth, (req, res) => {
  db.all("SELECT * FROM customers", (err, rows) => res.json(rows));
});

app.put('/api/customers/:id', requireAuth, (req, res) => {
  const { name, email } = req.body;
  db.run("UPDATE customers SET name = ?, email = ? WHERE id = ?", name, email, req.params.id, function(err) {
    if (err) return res.json({ success: false });
    res.json({ success: this.changes > 0 });
  });
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
