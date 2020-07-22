'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CategoriaComplemento extends Model {
  item () {
    return this.belongsTo('App/Models/Item')
  }

  complementos () {
    return this.hasMany('App/Models/Complemento')
  }
}

module.exports = CategoriaComplemento
