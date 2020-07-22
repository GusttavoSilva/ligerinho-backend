'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ContaBancaria extends Model {
  restaurante (){
    return this.belongsTo('App/Models/Restaurante')
  }
}

module.exports = ContaBancaria
