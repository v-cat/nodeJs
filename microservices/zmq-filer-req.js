"use strict";
const fs = require("fs");
const zmq = require("zeromq");
const filename = process.argv[2];

//created request endpoint
const requester = zmq.socket("req");
//handle replies from the responder
requester.on('message', data => {
    const response = JSON.parse(data);
    console.log('recived response:', response);
});
requester.connect('tcp://localhost:90400');
console.log(`Sending a request for ${filename}`);
requester.send(JSON.stringify({ path: filename }));
