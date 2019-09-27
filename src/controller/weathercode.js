const Axios = require('axios')

const weathercode = (long, lat, cb) => {
  const weatherUrl = `https://api.darksky.net/forecast/bf7ecc93afa3eb3497e49827b47351f6/${lat},${long}?units=si&lang=pt`

  Axios
    .get(weatherUrl)
    .then(res => cb(res))
    .catch(err => console.log(err.message))
}

module.exports = weathercode
