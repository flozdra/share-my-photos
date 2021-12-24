import {
  BaseModel,
  beforeSave,
  column,
  computed,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Organisation from 'App/Models/Organisation'
import Album from 'App/Models/Album'

const colors = ['#a11a5c', '#6f0b86', '#0f4ebb', '#14933a']

export default class User extends BaseModel {
  public static connection = 'pg'
  public static table = 'app.user'

  @manyToMany(() => Organisation, {
    pivotTable: 'app.organisation_user',
    serializeAs: 'organisations',
    onQuery(query) {
      query.apply((s) => s.metadata()).select('organisation.*')
    },
  })
  public organisations: ManyToMany<typeof Organisation>

  @hasMany(() => Album, { localKey: 'id', foreignKey: 'user_id' })
  public albums: HasMany<typeof Album>

  @column({ columnName: 'id', isPrimary: true })
  public id: number

  @column({ columnName: 'email' })
  public email: string

  @column({ columnName: 'firstname' })
  public firstname: string

  @column({ columnName: 'lastname' })
  public lastname: string

  @column({ columnName: 'password', serializeAs: null })
  public password: string | undefined

  @column({ columnName: 'remember_me_token' })
  public rememberMeToken: string

  @beforeSave()
  public static async hashPasswordEncrypt(user: User) {
    if (user.$dirty.password && user.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @computed()
  public get fullName() {
    return this.firstname + ' ' + this.lastname
  }
  @computed()
  public get initials() {
    return this.firstname[0] + this.lastname[0]
  }
  @computed()
  public get color() {
    return colors[this.firstname[0].charCodeAt(0) % colors.length]
  }
}
