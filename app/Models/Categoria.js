'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {

  restaurante () {
    return this.belongsTo('App/Models/Restaurante')
  }

  itens () {
    return this.hasMany('App/Models/Item')
  }

  tamanhopizza () {
    return this.hasMany('App/Models/TamanhoPizza')
  }

  massaborda () {
    return this.hasMany('App/Models/MassaBorda')
  }

  sabores () {
    return this.hasMany('App/Models/Sabor')
  }
}

module.exports = Categoria
