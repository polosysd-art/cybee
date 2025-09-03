const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // switch to file later

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)");
  db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)");
  db.run("CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
  // Optionally, invoices table later
});

module.exports = db;
