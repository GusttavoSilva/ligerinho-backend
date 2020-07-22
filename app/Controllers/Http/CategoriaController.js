'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Categoria = use('App/Models/Categoria')
/**
 * Resourceful controller for interacting with categorias
 */
class CategoriaController {
  
  async index () {
    const categorias = Categoria.query()
        .with('restaurante')
        .with('itens')
        .with('tamanhopizza')
        .with('massaborda')
        .with('sabores')
        .fetch()

    return categorias
  }

  async store({ request, response, auth }) {
    try {

      var data;

      data = request.only([
        "nome_categoria",
        "descricao_categoria",
        "classe"
      ])

      const categoria = await Categoria.create({ ...data, restaurante_id: auth.user.id })

      return categoria

    } catch (err) {
      //console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar categoria." } })
    }
  }

  async show({ params }) {
    const categoria = await Categoria.findOrFail(params.id)

    await categoria.load('restaurante')
    await categoria.load('itens')
    await categoria.load('tamanhopizza')
    await categoria.load('massaborda')
    await categoria.load('sabores')

    return categoria
  }

  async update({ params, request, response }) {
    const categoria = await Categoria.findOrFail(params.id)

    var data;

    data = request.only([
      "nome_categoria",
      "descricao_categoria",
      "classe"
  ])

    categoria.merge(data)

    await categoria.save()

    return categoria
  }

  async destroy({ params, request, response, auth }) {
    const categoria = await Categoria.findOrFail(params.id)

    if (categoria.restaurante_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await categoria.delete()
  }
}

module.exports = CategoriaController
