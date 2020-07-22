'use strict'

const Logo = use('App/Models/Logo')
const Restaurante = use('App/Models/Restaurante')
const Helpers = use('Helpers')

class LogoController {

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  async store ({ params, request, auth, response }){
    try {
      if (!request.file('image')) return

      const restaurante = await Restaurante.findOrFail(params.id)

      const images = request.file('image', {
        types: ['image'],
        size: '2mb'
      })
  
      // const fileName = `${Date.now()}-${image.subtype}` 
  
      // await image.moveAll(Helpers.tmpPath('uploads'), {
      //   name:fileName  
      // })
      await images.moveAll(Helpers.tmpPath('uploads'), file => ({
        name: `${Date.now()}-${file.clientName}`
      }))
  
      if (!images.movedAll()) {
        throw images.error() 
      }
      
      await Promise.all(
        images
          .movedList()
          .map(image => restaurante.logo().create({ path: image.fileName }))
      )
      // const logo = await Logo.create({
      //   path: image.fileName,
      //   restaurante_id: auth.user.id
      // })
  
      // return logo

    } catch (err) {
      return response
              .status(err.status)
              .send({ error: { message: 'Erro no uppload da logo '}})   
    }

  }

  async destroy ({ params, request, response, auth }) {
    // console.log(params.id)
    const image = await Logo.findOrFail(params.id)

    if (image.restaurante_id !== auth.user.id) {
      // console.log('Não autorizado')
      return response.status(401).send({ error: 'Not authorized' })
    }

    await image.delete()
  }
}

module.exports = LogoController
