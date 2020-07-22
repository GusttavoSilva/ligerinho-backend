'use strict'
const Antl = use('Antl')
class PrecoSabor {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      preco: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = PrecoSabor
