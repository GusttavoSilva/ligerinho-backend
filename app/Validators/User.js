'use strict'
const Antl = use('Antl')
class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      sobrenome: 'required',
      numero_celular: 'required'
   }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
