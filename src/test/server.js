// const http = require('http');


// const server = http.createServer((request, response)=>{
//     // can see in postman or browsers
//     console.log('header', request.headers)
//     console.log('method', request.method)
//     console.log('url', request.url)

//     const user = {
//         name: 'Joshua',
//         hobby: 'game'
//     }
// response.setHeader('Content-Type', 'application/json');
// response.end(JSON.stringify(user));

// })


// server.listen(3000);


const express = require('express');
const bodyParser = require('body-parser');

// express way

const server = express();


// middleware
// server.use((res, req, next)=> {
//     console.log('<p>middleware</p>');
    
//     next();
// })

// server.get('/', (req, res) => {
//     const user = {
//         name: 'Joshua', 
//         hobby: 'game'
//     }
//     // common calls used in restful APis
//     console.log(req.query) // used for query in url
//     console.log(req.params) // used for url manipulation
//     console.log(req.header)
//     console.log(req.body)
//     res.status(404).send("error");

//     res.send(user);
// })


// server.use(bodyParser.json());

// server.post('/profile', (req, res) => {
//     const user = {
//         name: 'Josh', 
//         hobby: 'sports'
//     }
//     res.send(user);
// })



// server.post('/', (req, res) => {
  
//     res.send('Success');
// })

server.use(express.static(__dirname + '/public')) // send static files

server.listen(3000);