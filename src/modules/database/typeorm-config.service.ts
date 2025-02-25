import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AllConfigType } from "../../common/types/config.type";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get("database.type", { infer: true }),
      url: this.configService.get("database.url", { infer: true }),
      host: this.configService.get("database.host", { infer: true }),
      port: this.configService.get("database.port", { infer: true }),
      username: this.configService.get("database.username", { infer: true }),
      password: this.configService.get("database.password", { infer: true }),
      database: this.configService.get("database.database", { infer: true }),
      synchronize: this.configService.get("database.synchronize", {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: false,
      logging:
        this.configService.get("app.nodeEnv", { infer: true }) === "production"
          ? ["error"]
          : ["warn", "error"],
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      // migrations: [__dirname + '/quries/**/*{.ts,.js}'],
      // uuidExtension: 'pgcrypto',
      autoLoadEntities: true,
      applicationName: this.configService.get("database.name", { infer: true }),
      cli: {
        entitiesDir: "src",
        migrationsDir: "src/migrations",
        subscribersDir: "subscriber",
      },
      // replication: {
      //       master: {},
      //       slaves: [],
      //     },
      extra: {
        // based on https://node-postgres.com/apis/pool
        // max connection pool size
        // max: this.configService.get("database.maxConnections", { infer: true }),
      },
    } as TypeOrmModuleOptions;
  }
}
