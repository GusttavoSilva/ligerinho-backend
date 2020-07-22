'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Complemento extends Model {
  catcomplementos () {
    return this.belongsTo('App/Models/CategoriaComplemento')
  }
}

module.exports = Complemento
