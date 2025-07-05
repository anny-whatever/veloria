const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const config = require("./config");

class Database {
  constructor() {
    this.db = null;
    this.init();
  }

  init() {
    const dbPath = path.resolve(config.dbPath);
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log("Connected to SQLite database");
        this.createTables();
      }
    });
  }

  createTables() {
    // Contact form submissions table
    const contactTableQuery = `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        subject TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT
      )
    `;

    // Book a call form submissions table
    const bookCallTableQuery = `
      CREATE TABLE IF NOT EXISTS book_call_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        preferred_date TEXT,
        preferred_time TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT
      )
    `;

    // Get started form submissions table
    const getStartedTableQuery = `
      CREATE TABLE IF NOT EXISTS get_started_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        service_type TEXT,
        budget_range TEXT,
        project_description TEXT,
        timeline TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT
      )
    `;

    // Execute table creation queries
    this.db.run(contactTableQuery, (err) => {
      if (err) {
        console.error("Error creating contact_submissions table:", err.message);
      } else {
        console.log("Contact submissions table created or already exists");
      }
    });

    this.db.run(bookCallTableQuery, (err) => {
      if (err) {
        console.error(
          "Error creating book_call_submissions table:",
          err.message
        );
      } else {
        console.log("Book call submissions table created or already exists");
      }
    });

    this.db.run(getStartedTableQuery, (err) => {
      if (err) {
        console.error(
          "Error creating get_started_submissions table:",
          err.message
        );
      } else {
        console.log("Get started submissions table created or already exists");
      }
    });
  }

  // Contact form methods
  insertContactSubmission(data) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO contact_submissions (name, email, phone, company, subject, message, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      this.db.run(
        query,
        [
          data.name,
          data.email,
          data.phone,
          data.company,
          data.subject,
          data.message,
          data.ip_address,
          data.user_agent,
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  }

  // Book call form methods
  insertBookCallSubmission(data) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO book_call_submissions (name, email, phone, company, preferred_date, preferred_time, message, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      this.db.run(
        query,
        [
          data.name,
          data.email,
          data.phone,
          data.company,
          data.preferred_date,
          data.preferred_time,
          data.message,
          data.ip_address,
          data.user_agent,
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  }

  // Get started form methods
  insertGetStartedSubmission(data) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO get_started_submissions (name, email, phone, company, service_type, budget_range, project_description, timeline, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      this.db.run(
        query,
        [
          data.name,
          data.email,
          data.phone,
          data.company,
          data.service_type,
          data.budget_range,
          data.project_description,
          data.timeline,
          data.ip_address,
          data.user_agent,
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  }

  // Get all submissions for admin purposes
  getAllSubmissions(table) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${table} ORDER BY created_at DESC`;

      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error("Error closing database:", err.message);
        } else {
          console.log("Database connection closed");
        }
      });
    }
  }
}

module.exports = new Database();
