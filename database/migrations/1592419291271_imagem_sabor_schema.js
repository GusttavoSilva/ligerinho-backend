'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagemSaborSchema extends Schema {
  up () {
    this.create('imagem_sabors', (table) => {
      table.increments()
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
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('imagem_sabors')
  }
}

module.exports = ImagemSaborSchema
