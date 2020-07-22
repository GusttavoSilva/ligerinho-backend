'use strict'
const Antl = use('Antl')
class Categoria {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      nome_categoria: 'required',
      descricao_categoria: 'required',
      classe: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Categoria
