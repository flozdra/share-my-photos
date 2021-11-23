import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Album from "App/Models/Album";
import {DateTime} from "luxon";
import User from "App/Models/User";

export default class Photo extends BaseModel {
  public static connection = 'pg'
  public static table = 'auth.photo'

  @belongsTo(() => Album, {
    foreignKey: 'id',
    localKey: 'albumId'
  })
  public album: BelongsTo<typeof Album>

  @belongsTo(() => User, {
    foreignKey: 'id',
    localKey: 'userId'
  })
  public user: BelongsTo<typeof User>

  @column({columnName: 'id', isPrimary: true})
  public id: number

  @column({columnName: 'name'})
  public name: string

  @column({columnName: 'url'})
  public url: string

  @column({columnName: 'user_id'})
  public userId: number

  @column({columnName: 'album_id'})
  public albumId: number

  @column.dateTime({columnName: 'creation'})
  public creation: DateTime

  @column({columnName: 'description'})
  public description: string

  @column({columnName: 'tags'})
  public tags: string[]
}
