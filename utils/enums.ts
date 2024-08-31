export enum ResponseCodes {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseCodeTexts {
  SUCCESS = "Success",
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
}

export enum Envioronments {
  LOCAL = "local",
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export enum DBTypes {
  MYSQL = "mysql",
  POSTGRES = "postgres",
  SQLITE = "sqlite",
}

export enum SQSEventType {
  EMPLOYEE_ANALYTICS = "EMPLOYEE_ANALYTICS",
}

export enum DeviceTypes {
  ANDROID = "ANDROID",
  IOS = "IOS",
  WEB = "WEB",
}
