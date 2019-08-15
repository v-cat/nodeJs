"use strict";
//引入node.js内置的assert模块，里面包含很多实用的比较函数
const assert = require("assert");

//声明EventEmitter和LDJClient两个变量
const EventEmitter = require("events").EventEmitter;
const LDJClient = require("../networking/lib/ldj-client");

//使用Mocha提供的describe()方法，第二个参数是函数，包含测试的具体内容。
describe("LDJClient", () => {
    let stream = null;
    let client = null;
    beforeEach(() => {
        // 将新的实例分别赋给stream和client
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });
    //it函数进行实际的测试

    it("should emit a message event from a single data evenr", done => {
        //给client的message事件设置监听函数，
        client.on("message", message => {
            //用deepEqual方法对检测数据和正确数据进行比较
            assert.deepEqual(message, { foo: "bar" });
            // 由于代码是异步的，需要通过Mocha提供的done函数来告诉Mocha什么时候结束
            done();
        });
        // 最后出发stream的data事件，引发message事件回调执行
        stream.emit("data", '{"foo":"bar"}\n');
        // process.nextTick(()=>stream.emit('data','"bar"}\n'));
    });
});
