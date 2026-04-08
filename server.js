const port = 8000
const express = requrie('express')
const server = express()

const pug = require('pug')
server.set('view engine', 'pug')

server.get('/', function(res,req){
res.render('frontpage', {title: 'Chatserver', message: 'Chatserver'})
})

server.listen(port, ()=>{console.log('hey')})

