'use strict'
const Antl = use('Antl')
class Cartao {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      numero: 'required',
      cvv: 'required',
      nome_titular: 'required',
      cpf_cnpj_titular: 'required',
      validade: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Cartao
