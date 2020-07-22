'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestauranteSchema extends Schema {
  up () {
    this.create('restaurantes', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('nome_fantasia', 240)
      table.string('cpf', 11).unique()
      table.string('cnpj', 14).unique()
      table.string('rg', 12).unique()
      table.string('orgão_emissor', 240)
      /**
       * PROCURAR TABELA DE ORGÃOS PARA INSERIR NO MYSQL
       */
      table.string('razao_social', 240)
      table.string('telefone', 14)
      table.string('cep', 8)
      table.string('endereco', 240)
      table.string('complemento', 240)
      table.string('numero',100)
      table.string('bairro',100)
      table.string('especialidade',100)
      /**
       * COPIAR DO IFOOD PARA INSERIR NO MYSQL
       */
      table.string('cidade',100)
      table.string('estado', 100)
      table.integer('entrega')
      /**
       * 0 - Não faz entrega
       * 1 - Faz entrega
       */
      table.integer('tipo_negocio')
      /*
        0 - MEI
        1 - ME E OUTROS
      */           
      table.decimal('latitude', 9, 6)
      table.decimal('longitude', 9, 6)
      table.string('token')
      table.timestamp('token_created_at') 
      table.timestamps()
    })
  }

  down () {
    this.drop('restaurantes')
  }
}

module.exports = RestauranteSchema
