'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('rua', 30)
      table.string('bairro', 60)
      table.string('numero', 20)
      table.string('complemento', 120)
      table.string('referencia', 150)
      table.string('cidade', 120)
      table.string('estado', 120)
      table.decimal('latitude', 9, 6)
      table.decimal('longitude', 9, 6)
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
