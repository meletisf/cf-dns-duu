const config    = require('../config.js');
const cloudflare = require('cloudflare')({
    token: config.cloudflare.token
});

module.exports = {

    'updateIP': (ip) => {
        return cloudflare.dnsRecords.edit(config.cloudflare.zone, config.cloudflare.record, {
            type: 'A',
            name: config.cloudflare.subdomain,
            content: ip
        });
    },

    'getIP': () => {
        return cloudflare.dnsRecords.read(config.cloudflare.zone, config.cloudflare.record);
    }

};