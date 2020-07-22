'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const UserHook = exports = module.exports = {}

UserHook.sendMailWelcome = async userInstance => {
  if (!userInstance.id) return

  const { email, username } = await userInstance

  await Mail.send(
    ['emails.welcome_usuario'],
    { username },
    message => {
      message
        .to(email)
        .from('matheusmm3@hotmail.com', 'Matheus | Ligeirinho')
        .subject('Bem vindo ao Ligeirinho')
    }
  )  
}
