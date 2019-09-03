"use strict"
const express = require('express');
const morgan = require('morgan');
const nconf = require('nconf');
const pkg = require('./package.json');
// nconf应该先读取参数变量，然后读取环境变量，传给env的“__”表示读取环境变量时，应该使用双下划线来表示层级对象
nconf.argv().env('__');
nconf.defaults({ conf: `${__dirname}/config.json` });
nconf.file(nconf.get('conf'));

const app = express();
app.use(morgan('dev'));
app.get('/api/version', (req, res) => res.status(200).send(pkg.version));
app.listen(nconf.get('port'), () => console.log('Ready>>>yea!!'))

require('./lib/search.js')(app,nconf.get('es'))
