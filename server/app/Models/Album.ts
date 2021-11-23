import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Organisation from "App/Models/Organisation";
import {DateTime} from "luxon";
import User from "App/Models/User";

export default class Album extends BaseModel {
  public static connection = 'pg'
  public static table = 'auth.album'

  @belongsTo(() => Organisation, {
    foreignKey: 'id',
    localKey: 'organisationId'
  })
  public organisation: BelongsTo<typeof Organisation>

  @belongsTo(() => User, {
    foreignKey: 'id',
    localKey: 'userId'
  })
  public user: BelongsTo<typeof User>

  @column({columnName: 'id', isPrimary: true})
  public id: number

  @column({columnName: 'name'})
  public name: string

  @column({columnName: 'organisation_id'})
  public organisationId: number

  @column.dateTime({columnName: 'creation'})
  public creation: DateTime

  @column({columnName: 'user_id'})
  public user_id: number
}
