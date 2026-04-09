

const port = 8000
const express = require('express')
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const { json } = require("node:stream/consumers");
const server = express()

const pug = require('pug')


server.get('/', function(res,req){
res.render('frontpage', {title: 'Chatserver', message: 'Chatserver'})
})

server.listen(port, ()=>{console.log('hey')})


// Middleware
server.set('view engine', 'pug')


server.use(express.json)
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'super-hemmelig-chat-noegle', 
    resave: false,
    saveUninitialized: false
}));


const dataFilePath = path.join(__dirname, 'data.json');
let db = { users: [], chats: [], messages: [] };

try {
    // Vi bruger readFileSync for at tvinge serveren til at vente med at starte,
    // før al dataen er læst ind fra disken.
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    db = JSON.parse(rawData);
    console.log("✅ Data blev læst ind med succes!");
} catch (error) {
    console.error("⚠️ Kunne ikke læse data.json. Er du sikker på den findes?", error.message);
}