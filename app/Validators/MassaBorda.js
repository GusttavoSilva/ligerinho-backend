'use strict'
const Antl = use('Antl')
class MassaBorda {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'required',
      preco: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = MassaBorda
