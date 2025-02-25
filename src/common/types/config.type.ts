export type AppConfig = {
    nodeEnv: string;
    version: string;
    applicationName: string;
    workingDirectory: string;
    frontendDomain?: string;
    backendDomain: string;
    syncProfileBackendDomain: string;
    corePort: number;
    workerPort: number;
    syncProfilePort: number;
    apiPrefix: string;
    allowedDomain?: any[];
    passwordSaltRounds: number;
    maxItemsInList: number;
    hosted: boolean;
    isNewRelicEnable: boolean;
    isClustorEnable: boolean;
    defaultPassword: string;
    realm: string;
    passwordResetLifetime?: number;
    cookiesToken?: boolean;
    isCookieEnable?: boolean;
    fallbackLanguage: string;
    headerLanguage: string;
    queuePrefix: string;
  };
  
  export type AuthConfig = {
    secret?: string;
    expires?: string;
    refreshSecret?: string;
    refreshExpires?: string;
  };
  
  export type DatabaseConfig = {
    url?: string;
    type?: string;
    host?: string;
    port?: number;
    database?: string;
    password?: string;
    name?: string;
    username?: string;
    synchronize?: boolean;
    // maxConnections: number;
    sslEnabled?: boolean;
    rejectUnauthorized?: boolean;
    runMigration?: boolean;
  };
  
  export type FileConfig = {
    driver: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    awsDefaultS3Bucket?: string;
    awsDefaultS3Url?: string;
    awsS3Region?: string;
    maxFileSize: number;
    downloadUrlExpire: number;
  };
  
  export type MailConfig = {
    port: number;
    host?: string;
    user?: string;
    password?: string;
    defaultEmail?: string;
    defaultName?: string;
    ignoreTLS: boolean;
    secure: boolean;
    requireTLS: boolean;
    mailServerRegion: string;
    schemaMapping: any;
  };
  
  export type FirebaseConfig = {
    projectId?: string;
    privateKey?: string;
    clientEmail?: string;
    appName?: string;
  };
  
  export type GoogleConfig = {
    clientId?: string;
    clientSecret?: string;
    oauthRedirectUri?: string;
  };
  
  export type TwilioConfig = {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  };
  
  export type AllConfigType = {
    app: AppConfig;
    auth: AuthConfig;
    database: DatabaseConfig;
    file: FileConfig;
    mail: MailConfig;
    firebase: FirebaseConfig;
    twilio: TwilioConfig;
  };
  