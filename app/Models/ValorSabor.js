'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ValorSabor extends Model {
  sabor () { 
    return this.belongsTo('App/Models/Sabor')
  }

  tamanho () {
    return this.belongsTo('App/Models/TamanhoPizza')
  }
}

module.exports = ValorSabor
