'use strict'

const Item = use('App/Models/Item')

class ItemController {

  async index ({ params }) {
    const itens = Item.query()
        .where('categoria_id', '=', params.category)
        .with('categoria')
        .with('images')
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
        "codigo_pdv",
        "promocao",
        "preco_old"
      ])

      const item = await Item.create({ ...data, restaurante_id: auth.user.id, categoria_id: params.category })

      return item

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao cadastrar item." } })
    }
  }

  async show({ params }) {
    const item = await Item.findOrFail(params.id)

    await item.load('categoria')
    await item.load('images')
    await item.load('catcomplementos')

    return item
  }

  async update({ params, request, response }) {
    const item = await Item.findOrFail(params.id)

    var data;

    data = request.only([
      "nome_item",
      "descricao",
      "preco",
      "codico_pdv",
      "promocao",
      "preco_old"
  ])

    item.merge(data)

    await item.save()

    return item
  }

  async destroy({ params, request, response, auth }) {
    const item = await Item.findOrFail(params.id)

    if (item.restaurante_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await item.delete()
  }

}

module.exports = ItemController
