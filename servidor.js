const geradorCypress = require('./geradorCypress')

const cors = require('cors')

const porta = 3003

const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const ejs = require('ejs')
const app = express()

app.use(cors({
    origin: '*'
}))

// app.engine('ejs', ejs.renderFile)
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get('/sucesso', (req, res) => {
    res.sendFile(__dirname + "/views/sucesso.html")
})

app.get('/css/bdd.css', (req, res) => {
    res.sendFile(__dirname + "/css/bdd.css") 
})

app.get('/fonts/PressStart2P-Regular.ttf', (req, res) => {
    res.sendFile(__dirname + "/fonts/PressStart2P-Regular.ttf") 
})

app.get('/fonts/Ubuntu-Regular.ttf', (req, res) => {
    res.sendFile(__dirname + "/fonts/Ubuntu-Regular.ttf") 
})

app.post('/addCenario', (req, res, next) => {
  let retorno =  geradorCypress.geraArquivo(req.body)
  if(retorno){  
    res.status(200).send('ok')
  }
  
})

app.listen(porta, () => {
    console.log(`Escutando a porta ${porta}`)
})