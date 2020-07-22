'use strict'

const Item = use('App/Models/Item')
const Helpers = use('Helpers')
const Image = use('App/Models/Image')

class ImageController {

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  async store ({ params, request, auth, response }){
    try {
      if (!request.file('image')) return

      const item = await Item.findOrFail(params.product)

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
                                           item_id: params.product, restaurante_id: auth.user.id }))
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

module.exports = ImageController
