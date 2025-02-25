/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmConfigService } from "./typeorm-config.service";
import databaseConfig from "src/common/configs/database.config";

@Module({})
export class ConnectionModule {
  static forRoot(source: string): DynamicModule {
    return {
      module: ConnectionModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          load: [databaseConfig],
          envFilePath: ["./.env"],
        }),
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
          dataSourceFactory: async (options: DataSourceOptions) => {
            return new DataSource(options).initialize();
          },
          inject: [DataSource, TypeOrmConfigService], // Add this line if you want to inject ConfigService to TypeOrmConfigService
        }),
      ],
      exports: [ConnectionModule],
    };
  }
}
