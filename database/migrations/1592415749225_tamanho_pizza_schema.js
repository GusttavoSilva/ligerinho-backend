'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TamanhoPizzaSchema extends Schema {
  up () {
    this.create('tamanho_pizzas', (table) => {
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
      table.timestamps()
    })
  }

  down () {
    this.drop('tamanho_pizzas')
  }
}

module.exports = TamanhoPizzaSchema
