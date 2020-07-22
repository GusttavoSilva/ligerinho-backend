'use strict'
const Antl = use('Antl')
class Conta {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      tipo_conta: 'required',
      banco: 'required',
      agencia: 'required',
      digito_agencia: 'required',
      conta: 'required|unique:conta_bancarias',
      digito_conta: 'required',
      poupanca: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Conta
