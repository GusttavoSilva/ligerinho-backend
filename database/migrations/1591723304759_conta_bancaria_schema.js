'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContaBancariaSchema extends Schema {
  up () {
    this.create('conta_bancarias', (table) => {
      table.increments()
      table
        .integer('restaurante_id')
        .unsigned()
        .references('id')
        .inTable('restaurantes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('tipo_conta').notNullable()
      /**
       *  0 - Física
       *  1 - Jurídica
       */
      table.string('banco').notNullable()
      table.integer('agencia').notNullable()
      table.integer('digito_agencia').notNullable()
      table.integer('conta').notNullable()
      table.integer('digito_conta').notNullable()
      table.integer('poupanca').notNullable()
      /**
       * 0 - Não
       * 1 - Sim
       */
      table.timestamps()
    })
  }

  down () {
    this.drop('conta_bancarias')
  }
}

module.exports = ContaBancariaSchema
