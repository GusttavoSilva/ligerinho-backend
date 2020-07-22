'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Sabor = use('App/Models/Sabor')
const Helpers = use('Helpers')
const Image = use('App/Models/ImagemSabor')
/**
 * Resourceful controller for interacting with imagemsabors
 */
class ImagemSaborController {
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  async store ({ params, request, auth, response }){
    try {
      if (!request.file('image')) return

      const item = await Sabor.findOrFail(params.flavor)

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
          .map(image => item.images().create({ path: image.fileName, categoria_id: params.category,
                                           sabor_id: params.flavor, restaurante_id: auth.user.id }))
      )
      // const logo = await Logo.create({
      //   path: image.fileName,
      //   restaurante_id: auth.user.id
      // })
  
      // return logo

    } catch (err) {
      console.log(err)
      return response
              .status(err.status)
              .send({ error: { message: 'Erro no uppload da logo '}})   
    }

  }

  async destroy ({ params, request, response, auth }) {
    // console.log(params.id)
    const image = await Image.findOrFail(params.id)

    if (image.restaurante_id !== auth.user.id) {
      // console.log('Não autorizado')
      return response.status(401).send({ error: 'Not authorized' })
    }

    await image.delete()
  }
}

module.exports = ImagemSaborController
