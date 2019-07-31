"use strict";
const fs = require("fs");
const net = require("net");
const filename = process.argv[2];
if (!filename) {
    throw Error(`Erroe:No filename specified !`);
}
net
    .createServer(connection => {
        //Reporting...
        console.log("subscriber connected.");
        connection.write(`Now watching "${filename}" for changes...\n`);
        // watching setup.
        const watcher = fs.watch(filename, () =>
            connection.write(`File changed:${new Date()}\n`)
        );
        //Cleanup
        connection.on("close", () => {
            console.log("Subscriber disconnected.");
            watcher.close();
        });
    })
    .listen('/tmp/watcher.socker', () => console.log("Listening for subscribers..."));
