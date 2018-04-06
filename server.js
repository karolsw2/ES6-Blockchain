import Express from 'express'
import Blockchain from './modules/Blockchain'
import path from 'path'

var app = Express()
var blockchain = new Blockchain()

blockchain._import(__dirname + '/public/blockchains/blockchain_01.json', () => {})

/**
* BLOCKCHAIN EXPLORER
*/

app.get('/', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(ip + ' has requested main page')
  res.sendFile(path.join(__dirname + '/public/explorer/build/index.html'))
})

/**
* BLOCKCHAIN API
*/
app.get('/api/recentBlocks', (req, res) => {
  res.setHeader('Content-type', 'application/json')
  res.send(JSON.stringify(blockchain.getRecentBlocks(6)))
})

app.get('/api/recentTransactions', (req, res) => {
  res.setHeader('Content-type', 'application/json')
  res.send(JSON.stringify(blockchain.getRecentTransactions(6)))
})

app.get('/api/block/:hash', (req, res) => {
  res.setHeader('Content-type', 'application/json')
  res.send(JSON.stringify(blockchain.getSpecifiedBlock(req.params.hash)))
})

app.get('/api/stats', (req, res) => {
  res.setHeader('Content-type', 'application/json')
  res.send(JSON.stringify(blockchain.stats))
})

app.use(Express.static('public'))

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
