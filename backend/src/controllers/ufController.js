'use strict'
const Promise = require('bluebird')
const rq = Promise.promisifyAll(require('request'))

module.exports= {

    async uf (req,res) {

        try {

            let opt = {
                url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
                headers: {
                    'Content-Type': 'application/json',
                    'method': 'GET'
                }
            }

            rq.getAsync(opt)
                    .then((data => { 

                       const body = JSON.parse(data.body)

                       const a = body.map(items =>{

                           return  items.sigla
                       })

                       console.log(a)

                        res.status(data.statusCode)
                        .json(a)

                    }))
                    .catch((err)=> {
                        res.status(500).json(err.stack)
                    })


        } catch (error) {
            res.status(500).json(error.stack)
        }



    }

}