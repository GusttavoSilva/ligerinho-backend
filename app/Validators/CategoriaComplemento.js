'use strict'
const Antl = use('Antl')
class CategoriaComplemento {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      nome: 'required',
      obrigatorio: 'required',
      qtd_min: 'required',
      qtd_max: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = CategoriaComplemento
