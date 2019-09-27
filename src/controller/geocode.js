const Axios = require('axios')

const geocode = (address, cb) => {
  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFmaWRlanUiLCJhIjoiY2swenk3bnJ6MDA1dzNocmhpd3lyanluMiJ9.H1Kboug80fxP2C787ZD0cA`

  Axios
    .get(mapUrl)
    .then(res => cb(res))
    .catch(err => console.log(err.message))
}

module.exports = geocode
