'use strict'
const Antl = use('Antl')
class TamanhoPizza {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = TamanhoPizza
