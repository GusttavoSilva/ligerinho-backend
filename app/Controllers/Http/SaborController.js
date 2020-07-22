'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Sabores = use('App/Models/Sabor')
/**
 * Resourceful controller for interacting with sabors
 */
class SaborController {
  async index ({ params }) {
    const itens = Sabores.query()
        .where('categoria_id', '=', params.category)
        .with('categoria')
        .with('images')
        .with('precos')      
        .fetch()

    return itens
  }

  async store({ request, response, auth, params }) {
    try {

      var data;

      data = request.only([
        "nome_item",
        "descricao",
        "codigo_pdv",
        "promocao"
      ])

      const item = await Sabores.create({ ...data, restaurante_id: auth.user.id, categoria_id: params.category })

      return item

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar sabor." } })
    }
  }

  async show({ params }) {
    const item = await Sabores.findOrFail(params.id)

    await item.load('categoria')
    await item.load('images')
    await item.load('precos')    

    return item
  }

  async update({ params, request, response }) {
    const item = await Sabores.findOrFail(params.id)

    var data;

    data = request.only([
      "nome_item",
      "descricao",
      "codigo_pdv",
      "promocao"
  ])

    item.merge(data)

    await item.save()

    return item
  }

  async destroy({ params, request, response, auth }) {
    const item = await Sabores.findOrFail(params.id)

    if (item.restaurante_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await item.delete()
  }
}

module.exports = SaborController
