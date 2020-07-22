'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValorSaborSchema extends Schema {
  up () {
    this.create('valor_sabors', (table) => {
      table.increments()
      table
        .integer('tamanho_pizza_id')
        .unsigned()
        .references('id')
        .inTable('tamanho_pizzas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')      
      table
        .integer('sabor_id')
        .unsigned()
        .references('id')
        .inTable('sabors')
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
      table.float('preco').notNullable()
      table.float('preco_old').defaultTo(0)      
      table.timestamps()
    })
  }

  down () {
    this.drop('valor_sabors')
  }
}

module.exports = ValorSaborSchema
