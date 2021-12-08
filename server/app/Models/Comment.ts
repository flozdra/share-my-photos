import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Photo from 'App/Models/Photo'
import { DateTime } from 'luxon'

export default class Comment extends BaseModel {
  public static connection = 'pg'
  public static table = 'app.comment'

  @belongsTo(() => Photo, {
    foreignKey: 'photoId',
    localKey: 'id',
  })
  public photo: BelongsTo<typeof Photo>

  @column({ columnName: 'id', isPrimary: true })
  public id: number

  @column.dateTime({ columnName: 'creation' })
  public creation: DateTime

  @column({ columnName: 'user_id' })
  public userId: number

  @column({ columnName: 'text' })
  public text: string

  @column({ columnName: 'photo_id' })
  public photoId: number
}
