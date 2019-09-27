const geoCode = require('./controller/geocode')
const weatherCode = require('./controller/weathercode')
const command = process.argv[2]


// Entra uma cidade e o API retorna as coordenadas
geoCode(command, (res) => {
  if(!command) {
    return console.log('\n Tente Novamente. Forneça um Local. \n')
  }
  const lat = res.data.features[0].geometry.coordinates[1]
  const long = res.data.features[0].geometry.coordinates[0]
  console.log(`Cidade: ${res.data.features[0].place_name}`)
  
  weatherCode(long, lat, (res) => {
    console.log(`
        Previsão: ${res.data.hourly.summary} \n
        Clima: ${res.data.currently.summary} \n
        Temperatura: ${res.data.currently.temperature}°Celsius \n
        Vai Chover?: ${res.data.currently.precipProbability}% de chances de cair água.
      `)
  })
})
// Pego esse retorno e passo na função
// Que retorna o clima na cidade passada

// pk.eyJ1IjoibWFmaWRlanUiLCJhIjoiY2swenk3bnJ6MDA1dzNocmhpd3lyanluMiJ9.H1Kboug80fxP2C787ZD0cA
