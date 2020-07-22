'use strict'
const Antl = use('Antl')
class Endereco {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      rua: 'required',
      bairro: 'required',
      numero: 'required',
      complemento: 'required',
      cidade: 'required',
      estado: 'required',
      latitude: 'required',
      longitude: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Endereco
