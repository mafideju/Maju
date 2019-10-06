const express = require('express')
const path = require('path')
const chalk = require('chalk')
const hbs = require('hbs')
const server = express()

const PORT = 7555
const publicPath = path.join(__dirname, 'public')
const partialsPath = path.join(__dirname, '/views/partials')

const geocode = require('./src/controller/geocode')
const weathercode = require('./src/controller/weathercode')

server.set('view engine', 'hbs')
server.use(express.static(publicPath))

hbs.registerPartials(partialsPath)

server.get('/', (req, res) => {
  res.render('index', {
    title: 'Sente o Clima !!!',
    name: 'Marcio Mafideju'
  })
})

server.get('/sobre', (req, res) => {
  res.render('sobre', {
    title: 'Sobre Sente o Clima !!!',
    name: 'Marcio Mafideju',
    message: 'Estamos na área !'
  })
})

server.get('/ajuda', (req, res) => {
  res.render('ajuda', {
    title: 'Ajuda em Sente o Clima !!!',
    name: 'Marcio Mafideju',
    message: 'Precisa de ajuda???'
  })
})

server.get('/clima', (req, res) => {
  geocode(req.query.address, (result, err) => {
    if (err) return res.send({ err })

    const lat = result.data.features[0].geometry.coordinates[1]
    const long = result.data.features[0].geometry.coordinates[0]
    const city = result.data.features[0].place_name
    weathercode(lat, long, (result, err) => {
      if (err) return res.send({ err })
      const time = (timestamp) => {
        const date = new Date(timestamp * 1000)
        const hour = date.getHours()
        const minute = date.getMinutes()
        return `${hour}:${minute < 10 ? `0${minute}` : minute}`
      }
      res.json({
        cidade: city,
        hora: time(result.data.currently.time),
        previsão: result.data.hourly.summary,
        ceu: result.data.currently.summary,
        temperatura: result.data.currently.temperature,
        chuva: result.data.currently.precipProbability
      })
      // console.log(lat, long)
    })
  })
})

server.listen(PORT, () => {
  console.log(
    chalk.blue('\n Servidor ') +
    chalk.green('Express ') +
    chalk.blue('Rodando ') +
    chalk.red(`@ Porta ${PORT}! \n`))
})
