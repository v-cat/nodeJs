"use strict";
const zmq = require("zeromq");

//Create the publisher endpoint.
const subscribe = zmq.socket("sub");
//subscribe to all message.
subscribe.subscribe('');
subscribe.on('message',data=>{
  const  message=JSON.parse(data);
  const date=new Date(message.timestamp);
  console.log(`File "${message.file}" changed at ${date}`)
})
//connect to publisher
subscribe.connect('tcp://localhost:60400');
