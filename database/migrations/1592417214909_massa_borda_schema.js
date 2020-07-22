'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MassaBordaSchema extends Schema {
  up () {
    this.create('massa_bordas', (table) => {
      table.increments()
      table
        .integer('categoria_id')
        .unsigned()
        .references('id')
        .inTable('categorias')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('restaurante_id')
        .unsigned()
        .references('id')
        .inTable('restaurantes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('nome', 50).notNullable()
      table.float('preco').notNullable()
      table.float('preco_old').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('massa_bordas')
  }
}

module.exports = MassaBordaSchema
