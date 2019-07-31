import { Stream } from "stream";

const EventEmitter = require('events').EventEmitter;
//LDJClient是一个类，
class LDJClient extends EventEmitter {
    constructor(stream) {
        //     //构造函数通过super()调用父类EventEmitter的构造函数

        super();
        let buffer = '';
        stream.on('data', data => {
            buffer += data;
            let boundary = buffer.indexOf('\n');
            while (boundary !== -1) {
                const input = buffer.substring(0, boundary);
                buffer = buffer.substring(boundary + 1);
                this.emit('message', JSON.parse(input));
                boundary = buffer.indexOf('\n');
            };
        });
    }
    static connect(stream) {
        return new LDJClient(stream);
    }
}

module.exports = LDJClient;
