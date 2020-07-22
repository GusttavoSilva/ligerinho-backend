'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const TamanhoPizza = use('App/Models/TamanhoPizza')
/**
 * Resourceful controller for interacting with tamanhopizzas
 */
class TamanhoPizzaController {

  async index ({ params }) {
    const tamanho = TamanhoPizza.query()
        .where('categoria_id', '=', params.category)
        .with('categoria')
        .fetch()

    return tamanho
  }

  async store({ request, response, auth, params }) {
    try {

      var data;

      data = request.only([
        "nome"
      ])

      const tamanho = await TamanhoPizza.create({ ...data, restaurante_id: auth.user.id, categoria_id: params.category })

      return tamanho

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar tamanho de pizza." } })
    }
  }

  async show({ params }) {
    const tamanho = await TamanhoPizza.findOrFail(params.id)

    await tamanho.load('categoria')


    return tamanho
  }

  async update({ params, request, response }) {
    const tamanho = await TamanhoPizza.findOrFail(params.id)

    var data;

    data = request.only([
      "nome"
  ])

    tamanho.merge(data)

    await tamanho.save()

    return tamanho
  }

  async destroy({ params, request, response, auth }) {
    const tamanho = await TamanhoPizza.findOrFail(params.id)

    if (tamanho.restaurante_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await tamanho.delete()
  }
}

module.exports = TamanhoPizzaController
