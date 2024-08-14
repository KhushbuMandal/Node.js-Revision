const http = require("http");
const fs = require("fs");
const { error } = require("console");

// const myServer = http.createServer((req, res) => {
//     //console.log ("Request Received")
//     console.log(req.headers);
//     res.end("Hello  from server")
// })

const myServer = http.createServer((req, res) => {
    const data = `${Date.now()} ${req.url} : New Request Received\n`;

    fs.appendFile ("data.txt" , data , (error , file) => {
        res.end("Hello Server")
    })
})


myServer.listen(5000 , () => {
    console.log ("Server is running Successfully");
})