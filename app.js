const Axios = require('axios');
const logger = require('./logs/logger');

logger();

const url = 'https://api.darksky.net/forecast/bf7ecc93afa3eb3497e49827b47351f6/-23,-46';

Axios
  .get(url)
  .then(result => console.log(result.data.currently))
  .catch(err => console.log(err));