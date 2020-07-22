'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  categoria () {
    return this.belongsTo('App/Models/Categoria')
  }

  images () {
    return this.hasMany('App/Models/Image')
  }

  catcomplementos() {
    return this.hasMany('App/Models/CategoriaComplemento')
  }
}

module.exports = Item
