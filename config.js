module.exports = {
    provider: process.env.PROVIDER || 'ip_api_com',
    logging: {
        level: "debug",
        file: "logs/duu.log",
        broadcastToPusher: process.env.BROADCAST_TO_PUSHER || false
    },
    pusher: {
        appId: process.env.PUSHER_APP,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER || 'eu',
        encrypted: process.env.PUSHER_ENCRYPTED || true
    },
    cloudflare: {
        token: process.env.CF_TOKEN,
        zone: process.env.CF_ZONE,
        record: process.env.CF_RECORD,
        subdomain: process.env.CF_SUBDOMAIN
    }
}