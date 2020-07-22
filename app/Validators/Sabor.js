'use strict'
const Antl = use('Antl')
class Sabor {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome_item: 'required',
      descricao: 'required',
      codigo_pdv: 'required',
      promocao: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Sabor
