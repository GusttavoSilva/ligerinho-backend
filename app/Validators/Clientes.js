'use strict'

const Antl = use('Antl')

class Clientes {
  get validateAll (){
    return true
  }

  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:restaurantes',
      password: 'required|confirmed',
      latitude: 'required',
      longitude: 'required',
      // tipo_negocio: 'required',
      // entrega: 'required',
      // especialidade: 'required',
      // cnpj: 'required|unique:restaurantes',
      // cpf: 'required',
      // nome_fantasia: 'required',
      // numero: 'required',
      // rg: 'required',
      // orgao_emissor: 'required',
      // razao_social: 'required',
      // telefone: 'required',
      // cep: 'required',
      // endereco: 'required',
      // cidade: 'required',
      // bairro: 'required',
      // estado: 'required'
   }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Clientes
