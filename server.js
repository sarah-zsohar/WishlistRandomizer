const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

const request = require('request');



var kits = [];






app.use('/', express.static('build'))
app.use(bodyParser.json());

console.log("we are running" + 9000);
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
// Serve static folder
// app.use(express.static('public'));




// Listen to me baby.. uh huh, uh huh!
// init().then(() => server.listen(9000));
server.listen(9000)


// const path = require('path');
// var AWS = require('aws-sdk');
// const express = require('express');
// const bodyParser = require('body-parser');
// var app = express();
// var multer = require('multer');
// var upload = multer({
//     dest: __dirname + '/uploads'
// });
// let server = require('http').Server(app);
// let io = require('socket.io')(server);
// const pug = require('pug');
// const request = require('request');
// const mqtt = require('mqtt');
// const fs = require('fs');
// const Q = require('q');
// let uuidV4 = require('uuid/v4');
//
var kits = [];

// var config = {
//     host: 'sarahzsohar.com',
//     port: 5432,
//     database: 'postgres',
//     user: 'sarah',

// };

const pg = require('pg');
const prompt = require('prompt');

//
var conString = "postgres://sarah:password@sarahzsohar.com:5432/postgres";
var client = new pg.Client(conString);
//
//
//
prompt.start();
connectToClient();

client.connect();

function connectToClient() {

}

// io.on('connection', function (socket) {
//     socket.on('submitNew', function (data) {
//         addNewEntryToDB(data)
//     });
// })
app.post('/updatePositions', function(req, res) {

    addNewEntryToDB(req.body)
    res.send();
})

app.get('/randomizer', function(req, res) {
    let self=res;
    client.query("SELECT * from USERS", (err, res) => {
        wishlists = res.rows;
        
        let length = wishlists.length;
        self.send(getRandomWishlist(wishlists))
        // return(wishlists[0])
    })

});
function addNewEntryToDB(data) {
    let query = "insert into users(name, birthday, wishlist_one)values('" + data.name + "','2001-" + data.birthday + "','" + data.wishlist_one + "');"

    client.query(query);
}

function getRandomWishlist(wishlists) {
    let random = Math.floor(Math.random() * wishlists.length);

    return(wishlists[random]);
}
exports = app;
// server.listen(9000)
//   //checks the randomly generated number against all the kit serial numbers already in the database
//   // if the serial exists, generate a new rand number, and check against that number. If it doesn't exist,
//   //createStatements function is called
//   // function doCheckForDup(currentIds, rand) {
//   //      var check=true;
//   //     for (let i = 0; i < currentIds.length; i++) {
//   //         if (currentIds[i] == rand) {
//   //             var check=false;
//   //         }
//   //     }
//   //     if(check){
//   //         createStatements(rand);
//   //     }else{
//   //         rand = Math.floor(Math.random() * 90000) + 100000;
//   //         doCheckForDup(currentIds, rand);
//   //     }
//   // }
//   //
//   // //creates actual insert statements.
//   // //generates a random uuid, and incrememnts the minor by one for each tracker
//   // //creates an array of insert statements, which is passed to
//   // function createStatements(rand) {
//   //     let insertStatements=[];
//   //     for (var i = 0; i < 1; i++) {
//   //         var uuid = uuidv4();
//   //         var minor = '0';
//   //         for (var p = 0; p < 12; p++) {
//   //             if (p == 10 || p == 11) {
//   //                 var f = p + '';
//   //                 uuid = uuid.replaceAt(6, f);
//   //                 uuid = uuid + '';
//   //                 var str = "INSERT INTO locationservicestest.kits(kit_serial_num, device_uuid, device_type, " + " customer_id)VALUES('" + rand + "', '" + uuid + "','asset',NULL);"
//   //             }else{
//   //                 uuid = uuid.replaceAt(6, '0');
//   //                 var f = p + '';
//   //                 uuid = uuid.replaceAt(7, f);
//   //                 var str = "INSERT INTO locationservicestest.kits(kit_serial_num, device_uuid, device_type, " +   " customer_id)VALUES('" + rand + "', '" + uuid + "', 'tracker', NULL); ";
//   //             }
//   //         insertStatements[p]=str;
//   //         }
//   //     }
//   //     insertIntoDatabase(insertStatements, rand)
//   // }
//   // //loops through the insertstatements array and adds each to the db,
//   // //calls the function asking if the user wants to do another
//   // function insertIntoDatabase(insertStatements, rand){
//   //     for (var i = 0; i < insertStatements.length; i++) {
//   //          client.query(insertStatements[i]);
//   //     }
//   //     console.log("New Kit with ID "+ rand+ " created!");
//   //     doAnother();
//   //
//   // }
//   // //asks user if they want to create an additional kit, if no, end clientç
//   // function doAnother(){
//   //     console.log("Create another kit? (y/n)")
//   //     prompt.get(['ans'], function (err, result) {
//   //         if (err) { return onErr(err); }
//   //         let ans = result.ans;
//   //         if(ans=='y'||ans=='Y'){
//   //             connectToClient();
//   //         }else{
//   //             client.end();
//   //         }
//   //     });
//   // }
//   // function onErr(err) {
//   //     console.log(err);
//   //     return 1;
//   // }
