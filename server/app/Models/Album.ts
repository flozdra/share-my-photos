import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Organisation from 'App/Models/Organisation'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Photo from 'App/Models/Photo'

// type Builder = ModelQueryBuilderContract<typeof Album>

export default class Album extends BaseModel {
  public static connection = 'pg'
  public static table = 'app.album'

  // public static metadata = scope((query: Builder, id: number) => {
  //   query
  //     .where('entity.reseller.id', id)
  //     .join('entity.client', 'entity.reseller.id', 'entity.client.reseller_id')
  //     .join('entity.site', 'entity.client.id', 'entity.site.client_id')
  //     .join('entity.sensor', 'entity.site.id', 'entity.sensor.site_id')
  //     .select('entity.sensor.id')
  // })

  @belongsTo(() => Organisation, {
    foreignKey: 'id',
    localKey: 'organisationId',
  })
  public organisation: BelongsTo<typeof Organisation>

  @belongsTo(() => User, {
    foreignKey: 'id',
    localKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Photo, {
    localKey: 'id',
    foreignKey: 'albumId',
  })
  public photos: HasMany<typeof Photo>

  @column({ columnName: 'id', isPrimary: true })
  public id: number

  @column({ columnName: 'name' })
  public name: string

  @column({ columnName: 'organisation_id' })
  public organisationId: number

  @column.dateTime({ columnName: 'creation' })
  public creation: DateTime

  @column({ columnName: 'user_id' })
  public userId: number

  @column({ columnName: 'color' })
  public color: string
}
