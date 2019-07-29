'use strict'
const fs = require('fs');
fs.watch('target.txt', () => console.log('File change!'));
console.log('Now whatching target.txt for change....');
