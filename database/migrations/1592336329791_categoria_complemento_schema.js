'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaComplementoSchema extends Schema {
  up () {
    this.create('categoria_complementos', (table) => {
      table.increments()
      table
        .integer('item_id')
        .unsigned()
        .references('id')
        .inTable('items')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
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
      table.string('nome').notNullable()
      table.integer('obrigatorio').defaultTo(0)
      table.integer('qtd_min')
      table.integer('qtd_max')
      table.timestamps()
    })
  }

  down () {
    this.drop('categoria_complementos')
  }
}

module.exports = CategoriaComplementoSchema
