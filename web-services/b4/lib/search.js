
const rp=require('request-promise')

const nconf = require('nconf');

// /**
//  * provides API endpoints for searching the books index
//  */
// 'use strict'
// const request = require('request');
module.exports = (app, es) => {
    const url = `http://${es.host}:${es.port}/${es.books_index}/book/_search`;
    require('./bundle.js')(app,nconf.get('es'));
    /**
   * Search for books by matching a particular field value
   */
    app.get('/app/search/books/:field/:query', (req, res) => {
        const esReqBody = {
            size: 10,
            query: {
                match: {
                    [req.params.field]: req.params.query
                }
            }
        }
        const options = { url, json: true, body: esReqBody };
        request.get(options, (err, esRes, esReqBody) => {
            if (err) {
                res.status(502).json({
                    error: 'bad_gateway',
                    reason: 'err.code',
                });
                return
            }
            if (esRes.statusCode !== 200) {
                res.status(esRes.statusCode).json(esReqBody);
                return;
            }
            res.status(200).json(esReqBody.hits.hits.map(({ _source }) => _source));
        })
    })
    app.get('/api/suggest/:filed/:query', (req, res) => {
        const esReqBody = {
            size: 0,
            suggest: {
                suggestions: {
                    text: req.params.query,
                    term: {
                        field: req.params.field,
                        suggest_mode: 'always',
                    }
                }
            }
        }
        // const options = { url, json: true, body: esReqBody }
        // const promise = new Promise((resolve, reject) => {
        //     request.get(options, (err, esRes, esResBody) => {
        //         if (err) {
        //             reject({ error: err });
        //             return;
        //         }
        //         if (esRes.statusCode !== 200) {
        //             reject({ error: esResBody });
        //             return;
        //         }
        //         resolve(esResBody)
        //     })
        // })
        // promise
       rp({ url, json: true, body: esReqBody }) 
            .then(esResBody => res.status(200).json(esResBody.suggest.suggestions))
            .catch(({ error }) => res.status(error.status || 502).json(error))

    })

}

// curl -s localhost:60702/api/suggest/authors/lipman | jq '.'
// curl -s localhost:60702/api/suggest/authors/lipman | jq '.[].options[].text'

//  curl -s -X POST localhost:60702/api/bundle?name=light%20reading | jq '.'