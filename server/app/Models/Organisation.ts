import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Album from 'App/Models/Album'
import Database from '@ioc:Adonis/Lucid/Database'

type Builder = ModelQueryBuilderContract<typeof Organisation>

export default class Organisation extends BaseModel {
  public static connection = 'pg'
  public static table = 'app.organisation'

  public serializeExtras() {
    return {
      photo_count: this.$extras.photo_count,
      album_count: this.$extras.album_count,
    }
  }

  public static metadata = scope((query: Builder) => {
    query
      .leftJoin('app.album', 'organisation.id', 'album.organisation_id')
      .leftJoin('app.photo', 'album.id', 'photo.album_id')
      .select(
        Database.rawQuery('count(photo.id) as photo_count, count(distinct album.id) as album_count')
      )
      .groupBy(
        'app.organisation_user.user_id',
        'app.organisation_user.organisation_id',
        'app.organisation.id'
      )
  })

  @manyToMany(() => User, {
    pivotTable: 'app.organisation_user',
    serializeAs: 'users',
  })
  public users: ManyToMany<typeof User>

  @hasOne(() => User, {
    localKey: 'createdByUserId',
    foreignKey: 'id',
    serializeAs: 'created_by_user',
  })
  public createdByUser: HasOne<typeof User>

  @hasMany(() => Album, {
    localKey: 'id',
    foreignKey: 'organisationId',
  })
  public albums: HasMany<typeof Album>

  @column({ columnName: 'id', isPrimary: true })
  public id: number

  @column({ columnName: 'name' })
  public name: string

  @column({ columnName: 'color' })
  public color: string

  @column({ columnName: 'created_by_user_id' })
  public createdByUserId: number
}
