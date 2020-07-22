'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CategoriaComplemento = use('App/Models/CategoriaComplemento')
/**
 * Resourceful controller for interacting with categoriacomplementos
 */
class CategoriaComplementoController {
 
  async index ({ params }) {
    const categorias = CategoriaComplemento.query()
        .where('item_id', '=', params.product)
        .with('item')
        .with('complementos')
        .fetch()

    return categorias
  }

  async store({ request, response, auth, params }) {
    try {

      var data;

      data = request.only([
        "nome",
        "obrigatorio",
        "qtd_min",
        "qtd_max"
      ])

      const categoria = await CategoriaComplemento.create({ ...data, restaurante_id: auth.user.id,
                                               categoria_id: params.category, item_id: params.product })

      return categoria

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar categoria de complemento." } })
    }
  }

  async show({ params }) {
    const categoria = await CategoriaComplemento.findOrFail(params.id)

    await categoria.load('item')
    await categoria.load('complementos')

    return categoria
  }

  async update({ params, request, response }) {
    const categoria = await CategoriaComplemento.findOrFail(params.id)

    var data;

    data = request.only([
      "nome",
      "obrigatorio",
      "qtd_min",
      "qtd_max"
  ])

    categoria.merge(data)

    await categoria.save()

    return categoria
  }

  async destroy({ params, request, response, auth }) {
    const categoria = await CategoriaComplemento.findOrFail(params.id)

    if (categoria.restaurante_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await categoria.delete()
  }
}

module.exports = CategoriaComplementoController
