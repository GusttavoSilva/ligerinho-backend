'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const MassaBorda = use('App/Models/MassaBorda')
/**
 * Resourceful controller for interacting with massabordas
 */
class MassaBordaController {
  
  async index ({ params }) {
    const itens = MassaBorda.query()
        .where('categoria_id', '=', params.category)
        .with('categoria')
        .fetch()

    return itens
  }

  async store({ request, response, auth, params }) {
    try {

      var data;

      data = request.only([
        "nome",
        "preco"
      ])

      const item = await MassaBorda.create({ ...data, restaurante_id: auth.user.id, categoria_id: params.category })

      return item

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar massa ou borda." } })
    }
  }

  async show({ params }) {
    const item = await MassaBorda.findOrFail(params.id)

    await item.load('categoria')

    return item
  }

  async update({ params, request, response }) {
    const item = await MassaBorda.findOrFail(params.id)

    var data;

    data = request.only([
      "nome",
      "preco"
  ])

    item.merge(data)

    await item.save()

    return item
  }

  async destroy({ params, request, response, auth }) {
    const item = await MassaBorda.findOrFail(params.id)

    if (item.restaurante_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await item.delete()
  }
}

module.exports = MassaBordaController
