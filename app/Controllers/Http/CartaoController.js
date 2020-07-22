'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Cartao = use('App/Models/Cartao')
/**
 * Resourceful controller for interacting with cartaos
 */
class CartaoController {

  async index () {
    const cartao = Cartao.query()
        .with('user')
        .fetch()

    return cartao
  }

  async store({ request, response, auth }) {
    try {

      var data;

      data = request.only([
        "numero",
        "cvv",
        "nome_titular",
        "cpf_cnpj_titular",
        "validade",
      ])

      const cartao = await Cartao.create({ ...data, user_id: auth.user.id })

      return cartao

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar cartão." } })
    }
  }

  async show({ params }) {
    const cartao = await Cartao.findOrFail(params.id)

    await cartao.load('user')

    return cartao
  }

  async update({ params, request, response }) {
    const cartao = await Cartao.findOrFail(params.id)

    var data;

    data = request.only([
      "numero",
      "cvv",
      "nome_titular",
      "cpf_cnpj_titular",
      "validade",
  ])

    cartao.merge(data)

    await cartao.save()

    return cartao
  }

  async destroy({ params, response, auth }) {
    const cartao = await Cartao.findOrFail(params.id)

    if (cartao.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await cartao.delete()
  } 
}

module.exports = CartaoController
