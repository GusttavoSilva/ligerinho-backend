'use strict'
const Mail = use('Mail')
const Helpers = use('Helpers')

const RestauranteHook = exports = module.exports = {}

RestauranteHook.sendMailWelcome = async restauranteInstance => {
  if (!restauranteInstance.id) return

  const { email, username } = await restauranteInstance

  await Mail.send(
    ['emails.welcome_cliente'],
    { username },
    message => {
      message
        .to(email)
        .from('matheusmm3@hotmail.com', 'Matheus | Ligeirinho')
        .subject('Bem vindo ao Ligeirinho')
    }
  ) 
}
