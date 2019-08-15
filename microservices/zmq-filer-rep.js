"use strict";
const fs = require("fs");
const zmq = require("zeromq");

const responder = zmq.socket("rep");
responder.on("message", data => {
    const request = JSON.parse(data);
    console.log(`Received request to get:${request.path}`);
    fs.readFile(request.path, (err, connect) => {

        console.log("sending response content.");

        responder.send(
            JSON.stringify({
                content: content.stringify(),
                timestamp: Date.now,
                pid: process.pid
            })
        );
    });
});
responder.bind("tcp://localhost:60400", err => {
    console.log("Listerning for zmq requesters...");
});
process.on("singing", () => {
    console.log("Shutting down...");
    responder.close();
});
