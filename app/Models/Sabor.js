'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sabor extends Model {
  categoria () {
    return this.belongsTo('App/Models/Categoria')
  }

  images () {
    return this.hasMany('App/Models/ImagemSabor')
  }

  precos () {
    return this.hasMany('App/Models/ValorSabor')
  }
}

module.exports = Sabor
