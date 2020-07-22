'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Endereco = use('App/Models/Endereco')
/**
 * Resourceful controller for interacting with enderecos
 */
class EnderecoController {

  async index () {
    const endereco = Endereco.query()
        .with('user')
        .fetch()

    return endereco
  }

  async store({ request, response, auth }) {
    try {

      var data;

      data = request.only([
          "rua",
          "bairro",
          "numero",
          "complemento",
          "referencia",
          "cidade",
          "estado",
          "latitude",
          "longitude"
      ])

      const endereco = await Endereco.create({ ...data, user_id: auth.user.id })

      return endereco

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar endereço." } })
    }
  }

  async show({ params }) {
    const endereco = await Endereco.findOrFail(params.id)

    await endereco.load('user')

    return endereco
  }

  async update({ params, request, response }) {
    const endereco = await Endereco.findOrFail(params.id)

    var data;

    data = request.only([
      "rua",
      "bairro",
      "numero",
      "complemento",
      "referencia",
      "cidade",
      "estado",
      "latitude",
      "longitude"
  ])

    endereco.merge(data)

    await endereco.save()

    return endereco
  }

  async destroy({ params, request, response, auth }) {
    const endereco = await Endereco.findOrFail(params.id)

    if (endereco.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await endereco.delete()
  }  
}

module.exports = EnderecoController
