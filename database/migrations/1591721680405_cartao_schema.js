'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartaoSchema extends Schema {
  up () {
    this.create('cartaos', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('numero', 20).notNullable()
      table.string('validade').notNullable()
      table.string('cvv').notNullable()
      table.string('nome_titular', 200).notNullable()
      table.string('cpf_cnpj_titular').notNullable()  
      table.timestamps()
    })
  }

  down () {
    this.drop('cartaos')
  }
}

module.exports = CartaoSchema
