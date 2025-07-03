const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Đường dẫn tới file database
const dbPath = path.resolve(__dirname, './data/maildb.sqlite');

// Khởi tạo database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database');
        // Tạo bảng emails nếu chưa tồn tại
        db.run(`CREATE TABLE IF NOT EXISTS emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender TEXT NOT NULL,
            recipient TEXT NOT NULL,
            subject TEXT,
            body TEXT,
            html TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// Các hàm thao tác với database
const dbOperations = {
    // Lưu email vào database
    saveEmail: (email) => {
        return new Promise((resolve, reject) => {
            const { from, to, subject, text, html } = email;
            
            db.run(
                `INSERT INTO emails (sender, recipient, subject, body, html) VALUES (?, ?, ?, ?, ?)`,
                [from, to, subject, text, html || null],
                function (err) {
                    if (err) {
                        console.error('Error saving email:', err.message);
                        reject(err);
                    } else {
                        console.log(`Email saved with ID: ${this.lastID}`);
                        resolve(this.lastID);
                    }
                }
            );
        });
    },

    // Lấy tất cả email
    getAllEmails: () => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM emails ORDER BY timestamp DESC`, [], (err, rows) => {
                if (err) {
                    console.error('Error fetching emails:', err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    // Lấy email theo ID
    getEmailById: (id) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM emails WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    console.error('Error fetching email:', err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },

    // Xóa email theo ID
    deleteEmail: (id) => {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM emails WHERE id = ?`, [id], function (err) {
                if (err) {
                    console.error('Error deleting email:', err.message);
                    reject(err);
                } else {
                    resolve(this.changes > 0);
                }
            });
        });
    },

    // Đóng kết nối database
    closeConnection: () => {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed');
            }
        });
    }
};

module.exports = dbOperations;
