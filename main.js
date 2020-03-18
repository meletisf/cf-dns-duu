const config = require('./config.js');
const log = require('./helpers/LogHelper');
const IPProvider = require('./helpers/IPProvidersHelper');
const Cloudflare = require('./helpers/CloudflareHelper');

log.info(`Ready to update ${config.cloudflare.subdomain} (${config.cloudflare.record})`)

IPProvider[config.provider]()
    .then(Cloudflare.updateIP() 
            .catch(e => {
                log.error(e)
            }))
    .catch(e => {
        log.error(e)
    });
