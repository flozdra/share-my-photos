import {BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";

export default class Organisation extends BaseModel {
  public static connection = 'pg'
  public static table = 'auth.organisation'

  @hasMany(() => User, {
    foreignKey: 'organisation_id',
  })
  public users: HasMany<typeof User>

  @column({ columnName: 'id', isPrimary: true })
  public id: number

  @column({ columnName: 'lastname' })
  public name: string
}
