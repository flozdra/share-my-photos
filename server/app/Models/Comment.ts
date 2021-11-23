import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Photo from 'App/Models/Photo'

export default class Comment extends BaseModel {
  public static connection = 'pg'
  public static table = 'app.photo'

  @belongsTo(() => Photo, {
    foreignKey: 'id',
    localKey: 'photo_id',
  })
  public photo: BelongsTo<typeof Photo>

  @column({ columnName: 'id', isPrimary: true })
  public id: number

  @column({ columnName: 'user_id' })
  public userId: number

  @column({ columnName: 'text' })
  public text: string

  @column({ columnName: 'photo_id' })
  public photoId: number
}
