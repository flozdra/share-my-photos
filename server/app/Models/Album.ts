import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Organisation from 'App/Models/Organisation'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Photo from 'App/Models/Photo'

export default class Album extends BaseModel {
  public static connection = 'pg'
  public static table = 'app.album'

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
}
