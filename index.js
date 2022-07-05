// config server
const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const {MongoClient} = require('mongodb');
// config database
const uri = "mongodb://localhost:27017";
const database = new MongoClient(uri);
const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);
// io
io.on('connection', (socket) => {
    console.log('a user connected');
    //socket.emit('message', 'Welcome to ChatCord!');

    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    // });
});

// database
async function test() {
	try {
        await database.connect();    
        const data = await database.db().admin().listDatabases();
        console.log("Databases:");
        console.log(data);
    } catch (e) {
        console.error(e);
    } finally {
        await database.close();
    }
}
async function listDatabases(){
    try {
        await database.connect();    
        const data = await database.db("admin").collection("main").findOne({old: true});
        console.log("Databases:");
        console.log(data);
    } catch (e) {
        console.error(e);
    } finally {
        await database.close();
    }
};
// request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/images/car.png', (req, res) => {
    res.sendFile(__dirname + '/public/images/car.png');
});
const server = app.listen(3000, function () {
    console.log("Ung dung Node.js dang lang nghe tai dia chi: localhost:3000")
})
