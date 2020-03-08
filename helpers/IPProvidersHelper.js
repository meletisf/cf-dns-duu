const log = require('./LogHelper');
const axios = require('axios');

module.exports = {
    'ifconfig_co': () => new Promise((res, rej) => {
        axios.get('http://ifconfig.co/ip')
            .then(resp => {
                let ip = resp.data.trim();
                log.info(`Received ${ip} from API ifconfig.co`);
                res(ip);
            })
            .catch(rej);
    }),
    'ip_api_com': () => new Promise((res, rej) => {
        axios.get('http://ip-api.com/json')
            .then(resp => {
                let ip = resp.data.query.trim();
                log.info(`Received ${ip} from API ip-api.com`);
                res(ip);
            })
            .catch(rej);
    })
}