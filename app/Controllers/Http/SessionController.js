'use strict'
const Token = use('App/Models/Token')

class SessionController {
  async store({  request, response, auth }){
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }

  async storeWeb({  request, response, auth }){
    const { email, password } = request.all()

    const token = await auth
                        .authenticator('api')
                        .attempt(email, password)

    return token
  }
}

module.exports = SessionController
