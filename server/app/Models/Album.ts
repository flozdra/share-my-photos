import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import Organisation from 'App/Models/Organisation'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Photo from 'App/Models/Photo'
import Database from '@ioc:Adonis/Lucid/Database'

type Builder = ModelQueryBuilderContract<typeof Album>

export default class Album extends BaseModel {
  public static connection = 'pg'
  public static table = 'app.album'

  public serializeExtras() {
    return {
      photo_count: this.$extras.photo_count,
    }
  }

  public static metadata = scope((query: Builder) => {
    query
      .leftJoin('app.photo', 'album.id', 'photo.album_id')
      .select(Database.rawQuery('count(photo.id) as photo_count'))
      .groupBy('app.album.id')
  })

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
