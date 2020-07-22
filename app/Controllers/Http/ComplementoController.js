'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Complemento = use('App/Models/Complemento')
/**
 * Resourceful controller for interacting with complementos
 */
class ComplementoController {

  async index ({ params }) {
    const itens = Complemento.query()
        .where('categoriescomp_id', '=', params.catcomp)
        .with('catcomplementos')
        .fetch()

    return itens
  }

  async store({ request, response, auth, params }) {
    try {

      var data;

      data = request.only([
        "nome_item",
        "descricao",
        "preco",
        "codigo_pdv"
      ])

      const item = await Complemento.create({ ...data, restaurante_id: auth.user.id, categoria_id: params.category,
                                                   item_id: params.product, categoriescomp_id: params.catcomp })

      return item

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar complemento." } })
    }
  }

  async show({ params }) {
    const item = await Complemento.findOrFail(params.id)

    await item.load('catcomplementos')

    return item
  }

  async update({ params, request, response }) {
    const item = await Complemento.findOrFail(params.id)

    var data;

    data = request.only([
      "nome_item",
      "descricao",
      "preco",
      "codigo_pdv"
  ])

    item.merge(data)

    await item.save()

    return item
  }

  async destroy({ params, request, response, auth }) {
    const item = await Complemento.findOrFail(params.id)

    if (item.restaurante_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await item.delete()
  }
}

module.exports = ComplementoController
