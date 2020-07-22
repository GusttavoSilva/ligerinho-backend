"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Restaurante = use("App/Models/Restaurante");
const Mail = use("Mail");
/**
 * Resourceful controller for interacting with restaurantes
 */
class RestauranteController {
  async index({ request }) {
    const { latitude, longitude } = request.headers();
    const { page } = request.get();

    const restaurantes = Restaurante.query()
      .with("logo")
      .nearBy(latitude, longitude, 13)
      .paginate(page);

    return restaurantes;
  }

  async store({ request, response }) {
    try {
      var data;
      var template;

      data = request.only([
        "username",
        "email",
        "password",
        // "tipo_negocio",
        // "entrega",
        // "especialidade",
        // "numero",
        // "complemento",
        // "nome_fantasia",
        // "cnpj",
        // "cpf",
        // "rg",
        // "orgao_emissor",
        // "razao_social",
        // "telefone",
        // "cep",
        // "endereco",
        // "cidade",
        // "bairro",
        // "estado",
        "latitude",
        "longitude",
      ]);

      const restaurante = await Restaurante.create(data);

      //   template = "emails.welcome_cliente"
      //   //console.log(user)
      //  await Mail.send(
      //     [template],
      //     { nome: restaurante.username },
      //     message => {
      //       message
      //         .to(restaurante.email)
      //         .from('matheusmm3@hotmail.com', 'Matheus | MealHunt')
      //         .subject('Bem vindo à MealHunt')
      //     }
      //   )

      return restaurante;
    } catch (err) {
      console.log(err);
      return response
        .status(err.status)
        .send({ error: { message: "Erro ao tentar criar usuário." } });
    }
  }

  async show({ params }) {
    const restaurante = await Restaurante.findOrFail(params.id);

    await restaurante.load("logo");

    console.log(restaurante);

    return restaurante;
  }

  async update({ params, request, response }) {
    const restaurante = await Restaurante.findOrFail(params.id);

    var data;

    data = request.only([
      "username",
      "email",
      "password",
      "tipo_negocio",
      "entrega",
      "especialidade",
      "numero",
      "complemento",
      "nome_fantasia",
      "cnpj",
      "cpf",
      "rg",
      "orgao_emissor",
      "razao_social",
      "telefone",
      "cep",
      "endereco",
      "cidade",
      "bairro",
      "estado",
      "latitude",
      "longitude",
    ]);

    restaurante.merge(data);

    await restaurante.save();

    return restaurante;
  }

  async destroy({ params, request, response, auth }) {
    const restaurante = await Restaurante.findOrFail(params.id);
    console.log(restaurante.id + "|" + auth.user.id);
    if (restaurante.id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }

    await restaurante.delete();
  }
}

module.exports = RestauranteController;
