'use strict'
const User = use("App/Models/User")
const Mail = use('Mail')
class UserController {
  
  async store({ request, response }) {
    try {

      var data;
      var template;

      data = request.only([
          "username",
          "email",
          "password",
          "sobrenome",
          "numero_celular"
      ])
      const user = await User.create(data)

      
      // template = "emails.welcome_usuario" 
      // //console.log(user)
      // await Mail.send(
      //   [template],
      //   { nome: user.username },
      //   message => {
      //     message
      //       .to(user.email)
      //       .from('matheusmm3@hotmail.com', 'Matheus | MealHunt')
      //       .subject('Bem vindo à MealHunt')
      //   }
      // )

      return user

    } catch (err) {
      console.log(err)
      return response.status(err.status)
        .send({ error: { message: "Erro ao criar usuário." } })
    }
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async update({ params, request, response }) {
    const user = await User.findOrFail(params.id)

    var data;

    data = request.only([
      "username",
      "email",
      "password",
      "sobrenome",
      "cpf",
      "numero_celular"
    ])

    user.merge(data)

    await user.save()

    return user
  }

  async destroy({ params, request, response, auth }) {
    const user = await User.findOrFail(params.id)

    if (user.id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await user.delete()
  }  
}

module.exports = UserController
