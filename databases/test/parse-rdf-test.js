'use strict'
const fs = require('fs');
const expect = require('chai').expect;
// 通过fs.readFileSync（）加载RDF文件
const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

describe('parseRDF', () => {
    it('should be a function', () => {
        // 期望parseRDF是一个function
        expect(parseRDF).to.be.a('function')
    })
})