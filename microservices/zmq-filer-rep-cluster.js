"use strict";
const cluster = require("cluster");
const fs = require("fs");
const zmq = require("zeromq");

//os模块获取cpu的数量
const numworkers = require("os").cpus().length;

if (cluster.isMaster) {
    // Master process creates Router and Dealer sockets and binds endpoints.
    // Router监听60401端口，准备接收TCP链接
    const router = zmq.socket("router").bind("tcp://localhost:60401");
    //dealer绑定到进程间的通信（IPC）节点
    const dealer = zmq.socket("dealer").bind("tcp://filer-dealer.ipc");

    //
    router.on("message", (...frames) => dealer.send(frames));
    dealer.on("message", (...frames) => router.send(frames));
    //
    cluster.on("online", worker =>
        console.log(`Worker ${worker.process.pid} is online`)
    );
    //
    for (let i = 0; i < numworkers; i++) {
        cluster.fork();
    }
} else {
    //
    const responder = zmq.socket("rep").connect("ipc://filter-dealer.ipc");
    responder.on("message", data => {
        //
        const request = JSON.parse(data);
        console.log(`${process.pid} received for :${request.path}`);
        //
        fs.readFile(request.path, (err, content) => {
            console.log(`${process.pid} sending response`);
            responder.send(
                JSON.stringify({
                    content: content.toString(),
                    timestamp: Date.now(),
                    pid: process.pid
                })
            );
        });
    });
}
