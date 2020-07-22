'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplementoSchema extends Schema {
  up () {
    this.create('complementos', (table) => {
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
      table
        .integer('categoria_complemento_id')
        .unsigned()
        .references('id')
        .inTable('categoria_complementos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('codigo_pdv').unique()
      table.string('nome_item').notNullable()
      table.string('descricao')
      table.float('preco').notNullable()
      table.float('preco_old').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('complementos')
  }
}

module.exports = ComplementoSchema
