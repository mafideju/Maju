const geoCode = require('./controller/geocode')
const weatherCode = require('./controller/weathercode')
const command = process.argv[2]

// Entra uma cidade e o API retorna as coordenadas
geoCode(command, ({ data }) => {
  if (!command) {
    return console.log('\n Tente Novamente. Forneça um Local. \n')
  }
  const lat = data.features[0].geometry.coordinates[1]
  const long = data.features[0].geometry.coordinates[0]
  console.log(`\n        Cidade........: ${data.features[0].place_name}`)

  weatherCode(long, lat, ({ data }) => {
    const time = (timestamp) => {
      const date = new Date(timestamp * 1000)
      const hour = date.getHours()
      const minute = date.getMinutes()
      return `${hour}:${minute}`
    }
    console.log(`
        Hora/Brasilia.: ${time(data.currently.time)} \n
        Previsão......: ${data.hourly.summary} \n
        Clima.........: ${data.currently.summary} \n
        Temperatura...: ${data.currently.temperature}°Celsius \n
        Vai Chover?...: ${data.currently.precipProbability}% de chances de cair água.
      `)
  })
})
// Pego esse retorno e passo na função
// Que retorna o clima na cidade passada

// pk.eyJ1IjoibWFmaWRlanUiLCJhIjoiY2swenk3bnJ6MDA1dzNocmhpd3lyanluMiJ9.H1Kboug80fxP2C787ZD0cA
