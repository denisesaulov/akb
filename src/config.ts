import {config} from "dotenv"

export function getConfigObject(): IConfig {
  const configObject = config().parsed
  const configResult = new Config()
  if (configObject && typeof configObject === "object") {
    if (configObject.APP_PORT && Number.isInteger(parseInt(configObject.APP_PORT))) {
      configResult.APP_PORT = parseInt(configObject.APP_PORT)
    }
    if (configObject.DB_PORT && Number.isInteger(parseInt(configObject.DB_PORT))) {
      configResult.DB_PORT = parseInt(configObject.DB_PORT)
    }
    if (configObject.DB_URL) {
      configResult.DB_HOST = configObject.DB_URL
    }
    if (configObject.DB_NAME) {
      configResult.DB_NAME = configObject.DB_NAME
    }
    if (configObject.DB_USER_NAME) {
      configResult.DB_USER_NAME = configObject.DB_USER_NAME
    }
    if (configObject.DB_PASSWORD) {
      configResult.DB_PASSWORD = configObject.DB_PASSWORD
    }
    if (configObject.DB_TYPE) {
      if (configObject.DB_TYPE === "mongodb") {
        configResult.DB_TYPE = configObject.DB_TYPE
      }
    }
    if (configObject.SECRETE_CODE) {
      configResult.SECRETE_CODE = configObject.SECRETE_CODE
    }
    if (configObject.ADMIN_LOGIN) {
      configResult.ADMIN_LOGIN = configObject.ADMIN_LOGIN
    }
    if (configObject.ADMIN_PASS) {
      configResult.ADMIN_PASS = configObject.ADMIN_PASS
    }
  } else {
    throw new Error("something wrong with .env file config")
  }
  return configResult
}

export interface IConfig {
  APP_PORT: number
  DB_HOST: string
  DB_PORT: number
  DB_NAME: string
  DB_USER_NAME: string
  DB_PASSWORD: string
  DB_TYPE: SupportedDB
  SECRETE_CODE: string
  ADMIN_LOGIN: string
  ADMIN_PASS: string
}

class Config implements IConfig {
  APP_PORT: number = 3000
  DB_NAME: string = "admin"
  DB_PASSWORD: string = "admin"
  DB_PORT: number = 27017
  DB_TYPE: SupportedDB = "mongodb"
  DB_HOST: string = "127.0.0.1"
  DB_USER_NAME: string = "admin"
  SECRETE_CODE: string = "secrete code"
  ADMIN_LOGIN: string = "admin"
  ADMIN_PASS: string = "12345678"
}

type SupportedDB = "mongodb"