import {BaseModel, beforeSave, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Organisation from "App/Models/Organisation";

export default class User extends BaseModel {
  public static connection = 'pg'
  public static table = 'auth.user'

  @belongsTo(() => Organisation, {
    foreignKey: 'id',
  })
  public organisation: BelongsTo<typeof Organisation>

  @column({ columnName: 'id', isPrimary: true })
  public id: number

  @column({ columnName: 'role' })
  public email: string

  @column({ columnName: 'firstname' })
  public firstname: string

  @column({ columnName: 'lastname' })
  public lastname: string

  @column({ columnName: 'password', serializeAs: null })
  public password: string | null

  @column({ columnName: 'organisation_id' })
  public organisationId: number

  @beforeSave()
  public static async hashPasswordEncrypt(user: User) {
    if (user.$dirty.password && user.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
