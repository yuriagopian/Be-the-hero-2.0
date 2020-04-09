'use strict'
require('dotenv/config');

const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')


    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: `${process.env.EMAIL}`, // generated ethereal user
            pass: `${process.env.PASSWORD}` // generated ethereal password
        }

    }
    )
    
    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: `" Be the hero 👻" <${process.env.EMAIL}>`, // sender address
    //     to: `${email}`, // list of receivers
    //     subject: "Be The Hero✔", // Subject line
    //     text: `Olá ${name}, estamos fornenendo este id para que tenha acesso ao nosso sistema e possa cadastrar novos casos`,
    //     html: `<h1> Seu id : ${id} </h1>`
    // });


module.exports = transporter;