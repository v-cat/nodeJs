"use strict";
const fs = require("fs");
const request = require("request");
const program = require("commander");
const pkg = require("./package.json");
const fullUrl = (path = "") => {
    let url = `http://${program.host}:${program.port}/`;
    if (program.index) {
        url += program.index + "/";
        if (program.type) {
            url += program.type + "/";
        }
    }
    return url + path.replace(/^\/*/, "");
};
const handleResponse = (err, res, body) => {
    if (program.json) {
        console.log(JSON.stringify(err || body));
    } else {
        if (err) throw err;
        console.log(body);
    }
};

program
    .version(pkg.version)
    .description(pkg.description)
    .usage("[options] <command> [...]")
    .option("-o, --host <hostname>", "hostname [localhost]", "localhost")
    .option("-p, --port <number>", "port number [9200]", "9200")
    .option("-j, --json", "format output as JSON")
    .option("-i, --index <name>", "which index to use")
    .option("-t, --type <type>", "default type for bulk operations")
    .command("url [path]")
    .description("generate the URL for the options and path (default is /)")
    .action((path = "/") => console.log(fullUrl(path)));
program
    .command("get [path]")
    .description("perform an HTTP GET request for path (default is /)")
    .action((path = "/") => {
        const options = {
            url: fullUrl(path),
            json: program.json
        };
        request(options, (err, res, body) => {
            if (program.json) {
                console.log(JSON.stringify(err || body));
            } else {
                if (err) throw err;
                console.log(body);
            }
        });
    });
program
    .command("create-index")
    .description("create an index")
    .action(() => {
        if (!program.index) {
            const msg = "No index specified! Use --index <name>";
            if (!program.json) throw Error(msg);
            console.log(JSON.stringify({ err: msg }));
            return;
        }
        request.put(fullUrl(), handleResponse);
    });
program
    .command("list-indices")
    .alias("li") //alias()方法添加别名
    .description("get a list if indices in this cluster")
    .action(() => {
        const path = program.json ? "_all" : "_cat/indices?v"; 
        //如果用户用--json标志制定了JSON模式，则路径为__all，否则为_cat/indices?v
        request({ url: fullUrl(path), json: program.json }, handleResponse);
    });
program.parse(process.argv);
if (!program.args.filter(arg => typeof arg === "object").length) {
    program.help;
}
// node ./index.js url 'syy/yy' -p 8080 -o my.cluster
// 输出http://my.cluster:8080/syy/yy
// node ./index.js  -V 查看版本 输出 1.0.0
//./esclu  get  给出es当前运行的版本信息
// ./esclu create-index --index books 创建books索引
// ./esclu  get '_cat/indices?v' 查看索引是否存在，v代表 verbose（详情），使用v会输出标题行
// ./esclu li //如果用户用--json标志制定了JSON模式，则路径为__all，否则为_cat/indices?v
// ./esclu li -j //如果用户用--json标志制定了JSON模式，则路径为__all，否则为_cat/indices?v
// ./esclu li -j | jq '.' //按原样输出对象
// ./esclu li -j | jq 'keys' //将对象的键提取为数组
// ./esclu get _stats | jq '.' |head -n 20
//  ./esclu get _stats | jq 'keys'
// ./esclu get _stats | jq '.indices' |head -n 20
// ./esclu get _stats | jq '.indices.books|keys' //将.indices.books过滤器的输出作为keys函数的输入，从而查看books有哪些关键字
