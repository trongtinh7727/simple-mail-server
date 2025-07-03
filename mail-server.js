const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');

const emails = [];

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
                const { subject, from, text } = parsed;
                emails.push({ subject, from: from.text, text });
                console.log('Received email:', subject);
                callback();
            })
            .catch(err => {
                console.error('Parse error:', err);
                callback(err);
            });
    },
});

server.listen(25, () => {
    console.log('SMTP server listening on port 25');
});

module.exports = { emails };
