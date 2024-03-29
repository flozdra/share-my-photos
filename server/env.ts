/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production'] as const),
  PORT: Env.schema.number(),
  DB_CONNECTION: Env.schema.string(),
  POSTGRES_HOST: Env.schema.string(),
  POSTGRES_PORT: Env.schema.number(),
  POSTGRES_USER: Env.schema.string(),
  POSTGRES_PASSWORD: Env.schema.string(),
  POSTGRES_DB_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['s3'] as const),
  TZ: Env.schema.enum.optional(['UTC'] as const),
})
