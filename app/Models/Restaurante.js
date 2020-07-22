'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Database = use('Database')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Restaurante extends Model {

  static scopeNearBy (query, latitude, longitude, distance) {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
      * cos(radians(latitude))
      * cos(radians(longitude)
      - radians(${longitude}))
      + sin(radians(${latitude}))
      * sin(radians(latitude))))`
  
    return query
      .select('*', Database.raw(`${haversine} as distance`))
      .whereRaw(`${haversine} < ${distance}`)
  }

  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('afterCreate', 'RestauranteHook.sendMailWelcome')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  contaBancaria () {
    return this.hasOne('App/Models/ContaBancaria')
  }

  logo () {
    return this.hasOne('App/Models/Logo')
  }

  categorias () {
    return this.hasMany('App/Models/Categoria')
  }
}

module.exports = Restaurante
