const port = 8000
const express = require('express')
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const { json } = require("node:stream/consumers");
const server = express()

const pug = require('pug')
server.set('view engine', 'pug')

server.get('/', function(res,req){
res.render('frontpage', {title: 'Chatserver', message: 'Chatserver'})
})

server.listen(port, ()=>{console.log('hey')})

