'use strict'

const crypto = require('crypto')
const moment = require('moment')
const User = use('App/Models/User')
const Mail = use('Mail')
const Restaurante = use('App/Models/Restaurante')

class ForgotPasswordController {
  async store ({ request, response}) {
    try {
        const email = request.input('email')
        const url = request.input('redirect_url')
        
        const user = await User.findByOrFail('email', email)
        //vai gerar um token com 10 bytes e converter em string hexadecimal
        user.token = crypto.randomBytes(10).toString('hex')
        user.token_created_at = new Date()

        await user.save()
        

        await Mail.send(
            ['emails.forgot_password',],
            {nome: user.username, email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}`},
            message => {
                message
                   .to(user.email)
                   .from('matheusmm3@hotmail.com', 'Matheus | MealHunt')
                   .subject('Recuperar senha MealHunt')
            }
        )
    } catch(err){
        return response.status(err.status)
        .send({ error: { message: "O email inserido não foi encontado na base de dados. Esse email existe?" }})
    } 
  }

  async update({ request, response }){
    try{
        const { token , password } = request.all()

        const user = await User.findByOrFail('token', token)

        //Verifica se o token já não tem mais de 1 dia - foi expirado
        const tokenExpired = moment()
           .subtract('1', 'hours')
           .isAfter(user.token_created_at)

        if(tokenExpired){
            return response.status(401)
            .send({ message: "O token de recuperação de senha está expirado." })                
        }

        user.token = null
        user.token_created_at = null
        user.password = password

        await user.save()


    } catch(err){
        return response.status(err.status)
        .send({ error: { message: "Algo deu errado ao resetar sua senha." }})
    } 
  }

  async storeRes ({ request, response}) {
    try {
        const email = request.input('email')
        const url = request.input('redirect_url')
        
        const restaurante = await Restaurante.findByOrFail('email', email)
        //vai gerar um token com 10 bytes e converter em string hexadecimal
        restaurante.token = crypto.randomBytes(10).toString('hex')
        restaurante.token_created_at = new Date()

        await restaurante.save()
        

        await Mail.send(
            ['emails.forgot_password',],
            {nome: restaurante.username, email, token: restaurante.token, link: `${request.input('redirect_url')}?token=${restaurante.token}`},
            message => {
                message
                   .to(restaurante.email)
                   .from('matheusmm3@hotmail.com', 'Matheus | MealHunt')
                   .subject('Recuperar senha MealHunt')
            }
        )
    } catch(err){
        return response.status(err.status)
        .send({ error: { message: "O email inserido não foi encontado na base de dados. Esse email existe?" }})
    } 
  }

  async updateRes({ request, response }){
    try{
        const { token , password } = request.all()

        const restaurante = await Restaurante.findByOrFail('token', token)

        //Verifica se o token já não tem mais de 1 dia - foi expirado
        const tokenExpired = moment()
           .subtract('1', 'hours')
           .isAfter(user.token_created_at)

        if(tokenExpired){
            return response.status(401)
            .send({ message: "O token de recuperação de senha está expirado." })                
        }

        restaurante.token = null
        restaurante.token_created_at = null
        restaurante.password = password

        await restaurante.save()


    } catch(err){
        return response.status(err.status)
        .send({ error: { message: "Algo deu errado ao resetar sua senha." }})
    } 
  }
}

module.exports = ForgotPasswordController
