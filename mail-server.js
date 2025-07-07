const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const db = require('./database');
const fs = require('fs');
const path = require('path');

// Đảm bảo thư mục data tồn tại
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('Created data directory');
}

const server = new SMTPServer({
    authOptional: true,
    onRcptTo(address, session, callback) {
        if (address.address.endsWith('@iiex.tech')) {
            callback();
        } else {
            callback(new Error('Domain not accepted'));
        }
    },
    onData(stream, session, callback) {
        simpleParser(stream)
            .then(parsed => {
                const { subject, from, to, text, html } = parsed;

                // Lưu email vào database
                db.saveEmail({
                    from: from.text,
                    to: to?.text || session.envelope.rcptTo.map(rcpt => rcpt.address).join(', '),
                    subject,
                    text,
                    html
                })
                    .then(() => {
                        console.log('Received and saved email:', subject);
                        callback();
                    })
                    .catch(err => {
                        console.error('Database save error:', err);
                        callback(err);
                    });
            })
            .catch(err => {
                console.error('Parse error:', err);
                callback(err);
            });
    },
});

server.on('error', err => {
    if (err.code === 'ERR_SSL_UNKNOWN_PROTOCOL') {
        console.log(`Attempted non-SMTP connection from: ${err.remote}`);
        return;
    }
    console.error('SMTP server error:', err);
});

server.listen(25, () => {
    console.log('SMTP server listening on port 25');
});