'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up () {
    this.create('items', (table) => {
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
      table.integer('codigo_pdv').unique()
      table.string('nome_item').notNullable()
      table.string('descricao')
      table.integer('promocao').defaultTo(0)
      table.float('preco').notNullable()
      table.float('preco_old').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemSchema
