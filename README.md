# Cloudflare DNS Dynamic Update Utility

This tiny piece of code is very handy when you want to keep a DNS record always pointed to a particular connection that does not possess a static IPv4 address.

By using the Cloudflare DNS service in addition with their API, this script will query one of the 2 supported services to determine the IPv4 of the host and then update a specified subdomain.


## Usage

The first step if to request an API token from Cloudflare. The required access masks are **Zone:Read** and **DNS:Edit**. 
Please keep in mind that you have to create an **API Token** and not **API Keys**!!!


Make sure that you have properly added your domain in Cloudflare and you have added a DNS record that you would like to point to your IP address.

After doing so, you will have to acquire the following strings: **ZONE ID**, **DNS ENTRY ID**.

#### ZONE ID

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones?name=<YOUR DOMAIN.TLD>" \
     -H "Authorization: Bearer <YOUR API TOKEN>" \
     -H "Content-Type: application/json"
```
The above command will list all the data for the domain that you specified in the `name` parameter. Copy and the the `id` field. 

**Example response:**

```json
Response (example)
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "example.com",
      "development_mode": 7200,
      "original_name_servers": [
        "ns1.originaldnshost.com",
        "ns2.originaldnshost.com"
      ],
      "original_registrar": "GoDaddy",
      "original_dnshost": "NameCheap",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "activated_on": "2014-01-02T00:01:00.12345Z",
      "owner": {
        "id": {},
        "email": {},
        "type": "user"
      },
      "account": {
        "id": "01a7362d577a6c3019a474fd6f485823",
        "name": "Demo Account"
      },
      "permissions": [
        "#zone:read",
        "#zone:edit"
      ],
      "plan": {
        "id": "e592fd9519420ba7405e1307bff33214",
        "name": "Pro Plan",
        "price": 20,
        "currency": "USD",
        "frequency": "monthly",
        "legacy_id": "pro",
        "is_subscribed": true,
        "can_subscribe": true
      },
      "plan_pending": {
        "id": "e592fd9519420ba7405e1307bff33214",
        "name": "Pro Plan",
        "price": 20,
        "currency": "USD",
        "frequency": "monthly",
        "legacy_id": "pro",
        "is_subscribed": true,
        "can_subscribe": true
      },
      "status": "active",
      "paused": false,
      "type": "full",
      "name_servers": [
        "tony.ns.cloudflare.com",
        "woz.ns.cloudflare.com"
      ]
    }
  ]
}
```

#### RECORD ID

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/<YOUR ZONE ID>/dns_records?name=<YOUR.FULL DOMAIN.TLD>" \
     -H "Authorization: Bearer <YOUR API TOKEN>" \
     -H "Content-Type: application/json"
```

**Example response:**

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "372e67954025e0ba6aaa6d586b9e0b59",
      "type": "A",
      "name": "example.com",
      "content": "198.51.100.4",
      "proxiable": true,
      "proxied": false,
      "ttl": 120,
      "locked": false,
      "zone_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "zone_name": "example.com",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "data": {},
      "meta": {
        "auto_added": true,
        "source": "primary"
      }
    }
  ]
}
```

## Configuration File

By default, you can inject all the required strings using environment variables. Feel free to override `config.js` and hard-code the values.

```js
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
```

## IP Provider Services

You can use wither of these two services in order to resolve your IP address.

+ **ifconfig_co** http://ifconfig.co/ip
+ **ip_api_com** http://ip-api.com/json
