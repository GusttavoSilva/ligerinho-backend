'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Valor = use('App/Models/ValorSabor')
/**
 * Resourceful controller for interacting with valorsabors
 */
class ValorSaborController {
  async index ({ params }) {
    const itens = Valor.query()
        .where('sabor_id', '=', params.flavor)
        .with('sabor')
        .with('tamanho')      
        .fetch()

    return itens
  }

  async store({ request, response, auth, params }) {
    try {

      var data;

      data = request.only([
        "preco",
        "preco_old"
      ])

      const item = await Valor.create({ ...data, restaurante_id: auth.user.id, categoria_id: params.category,
                                       sabor_id: params.flavor, tamanho_pizza_id: params.size})

      return item

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar valor." } })
    }
  }

  async show({ params }) {
    const item = await Valor.findOrFail(params.id)

    await item.load('sabor')
    await item.load('tamanho')    

    return item
  }

  async update({ params, request, response }) {
    const item = await Valor.findOrFail(params.id)

    var data;

    data = request.only([
      "preco",
      "preco_old"
  ])

    item.merge(data)

    await item.save()

    return item
  }

  async destroy({ params, request, response, auth }) {
    const item = await Valor.findOrFail(params.id)

    if (item.restaurante_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await item.delete()
  }
}

module.exports = ValorSaborController
