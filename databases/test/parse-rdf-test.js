'use strict'
const fs = require('fs');
const expect = require('chai').expect;
// 通过fs.readFileSync（）加载RDF文件
const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);
const parseRDF = require('../lib/parse-rdf.js')


describe('parseRDF', () => {
    it('should be a function', () => {
        // 期望parseRDF是一个function
        expect(parseRDF).to.be.a('function')
    })
    it('should parse RDF content', () => {
        const book = parseRDF(rdf);
        expect(book).to.be.an('object');
        // expect(book).to.have.a.property('id', 132);
        // expect(book).to.have.a.property('title', 'The Art of War');
        expect(book).to.have.a.property('authors')
            .that.is.an('array').with.lengthOf(2)
            // // .and.contains('Sunzi,active 6th century B.C')
            // .and.contains('Gile,Lionel')
            .that.is.an('array').with.lengthOf(2)
            // .and.contains('Military Art and science--early works to 1880')

    })
})