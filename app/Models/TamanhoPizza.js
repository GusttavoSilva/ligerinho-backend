'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TamanhoPizza extends Model {
  categoria () {
    return this.belongsTo('App/Models/Categoria')
  }

}

module.exports = TamanhoPizza
