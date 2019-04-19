//require it into the file
var express = require('express')
//create an instance of the express module
var app = express()

/**
 * 	With Socket.IO, we will be able to notify clientsor the
 *  app running in the browser when another user has sent a chat message,
 *  that way the app will update their message list instantly. so install it using npm
 * but here, it also needs to tie in with express, so well create a regular tttp server with node that well share with 
 * express and socket.io
 */

var http = require('http').Server(app)
var io = require('socket.io')(http)
//after this, set it up on the front end


var bodyParser = require('body-parser')

//get the app prepped for an html file, because nothing is being hosted on the server yet
//when nothing is hosted on the server, you will get a 404 not found error

//__dirname passes in the entire directory
app.use(express.static(__dirname))
//this lets bodyParser know that we're expecting a json file to com in with our http request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//creating a placeholder messages list

var messages = [
    {name: 'Harsh', message: "yo"}, 
    {name: 'James', message: 'waddup'}
]

//create a /GET request
app.get('/messages', (req, res) => {
    //res.send('hello')
    res.send(messages) // you need to make sure youre getting the messages in the front end using an ajax request
})

//now create a /POST request
app.post('/messages', (req, res) => {
    //res.send('hello')
    //console.log(req.body)
    messages.push(req.body)

    io.emit('message', req.body)
    //for this line to take effect, you need to add an event listener in the html file 


    /**
     * Now, we cant easily send a post request from the browser, which is why we will use postman 
     * Update the URL with our post endpoint of localhost:3000/messages
     * Since in console.log, the req cannot recognize the body, we need a body-parser module, 
     * which we can install from npm by running the command
     * 
     * npm install -s body-parser //then require it at the top
     */
    res.sendStatus(200) //200 OK, everything went well
})

io.on('connection', (socket) => {
    console.log('a user connected')
})


// //create a port number 3000 on you rlocal machine
// app.listen(3000)

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})

