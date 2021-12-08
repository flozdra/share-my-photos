import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Album from 'App/Models/Album'

export default class Organisation extends BaseModel {
  public static connection = 'pg'
  public static table = 'app.organisation'

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

  @column({ columnName: 'created_by_user_id' })
  public createdByUserId: number
}
