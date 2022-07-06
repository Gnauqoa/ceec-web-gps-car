// config server
const express = require('express');
const {Server} = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
// config database
const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017";
const database = new MongoClient(uri);

// io
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// request
let data = [];
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/images/car.png', (req, res) => {
    res.sendFile(__dirname + '/public/images/car.png');
});
app.get('/js/main.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/main.js');
});
app.post('/newLatLng', (req,res) => {
   
        data.push(req.body);
        console.log(req.body);
        io.emit("dataLatLng", [ {
            lat: 10.762622, 
            lng: 106.660172,
            time: "15p" 
        },
        {
            lat: 10.761926, 
            lng: 106.660418,
            time: "15p" 
        }]);
        res.send("ok")
  
  
});
server.listen(3000, function () {
    console.log("Ung dung Node.js dang lang nghe tai dia chi: localhost:3000")
})
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