'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ContaBancaria = use('App/Models/ContaBancaria')
/**
 * Resourceful controller for interacting with contabancarias
 */
class ContaBancariaController {

  async store({ request, response, auth }) {
    try {

      var data;

      data = request.only([
        "tipo_conta",
        "banco",
        "agencia",
        "digito_agencia",
        "conta",
        "digito_conta",
        "poupanca"
      ])

      const conta = await ContaBancaria.create({ ...data, restaurante_id: auth.user.id })

      return conta

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar conta bancária." } })
    }
  }

  async show({ params }) {
    const conta = await ContaBancaria.findOrFail(params.id)

    await conta.load('restaurante')

    return conta
  }

  async update({ params, request, response }) {
    const conta = await ContaBancaria.findOrFail(params.id)

    var data;

    data = request.only([
      "tipo_conta",
      "banco",
      "agencia",
      "digito_agencia",
      "conta",
      "digito_conta",
      "poupanca"
  ])

    conta.merge(data)

    await conta.save()

    return conta
  }


}

module.exports = ContaBancariaController
