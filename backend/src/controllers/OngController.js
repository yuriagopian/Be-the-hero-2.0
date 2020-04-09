const crypto = require('crypto')
const connection = require('../database/connection');
const mailer = require('../utils/nodemailer')
require('dotenv/config');


module.exports = {
    async create(req, res) {

        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        mailer.sendMail({

            from: `" Be the hero 👻" <${process.env.EMAIL}>`, // sender address
            to: `${email}`, // list of receivers
            subject: "Be The Hero ✔", // Subject line
            // text: `Olá ${name}, estamos fornenendo este id para que tenha acesso ao nosso sistema e possa cadastrar novos casos`,
            html: `Olá ${name}, estamos fornenendo este id para que tenha 
            acesso ao nosso sistema e possa cadastrar novos casos </br> 
            <h1>Seu id : ${id}</h1>`

        })


        return res.json({ id });
    },

    async list(req, res) {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs)
    }
}