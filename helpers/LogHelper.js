const config = require('../config.js');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
var PusherLogger = require('winston-pusher');

let transports_list = [
    new transports.Console({ level: config.logging.level }),
    new transports.File({ 
        filename:   config.logging.file,
        level:      config.logging.level 
    })
];

if (config.logging.broadcastToPusher) {
    transports_list.push(
        new (PusherLogger)({
            level: 'info',
            pusher: {
                "appId": config.pusher.appId,
                "key": config.pusher.key,
                "secret": config.pusher.secret,
                "cluster": config.pusher.cluster,
                "encrypted": config.pusher.encrypted
            }
        })
    )
}

const log = createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: transports_list
});

module.exports = log;