'use strict'
const netClient = require('net').connect({ port: 60300 });
const ldjCLient = require('./lib/ldj-client.js').connect(netClient);
ldjCLient.on('message', message => {
    if (message.type === 'watching') {
        console.log(`now watching:${message.file}`);
    } else if (message.type === 'changed') {
        console.log(`Filed changed:${new Date(message.timestamp)}`);


    } else {
        throw Error(`Unrecognized message type :${message.type}`)
    }
})