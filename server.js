const express = require('express')
// const app = require('./src/app.js')
const path = require('path')
const server = express()

const PORT = 3556
const publicPath = path.join(__dirname, 'public')

server.set('view engine', 'hbs')
server.use(express.static(publicPath))

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
  res.send({
    nome: 'Marcio Rodrigues',
    idade: 36,
    banda: 'Porta Amarela'
  })
})

server.listen(PORT, () => {
  console.log(`Servidor Ativo na Porta ${PORT}`)
})
