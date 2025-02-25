import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskSchedulerModule } from './task-scheduler/task-scheduler.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import databaseConfig from './common/configs/database.config';
import { ConnectionModule } from './modules/database/connection.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleAuthService } from './common/google-auth.service';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig
      ],
      envFilePath: ['./.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // Import the ConfigModule to access config
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',  // Replace with your DB type (mysql, sqlite, etc.)
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],  // Adjust path if needed
        ssl: { rejectUnauthorized: false },  // Enable SSL if needed
        uuidExtension: 'pgcrypto',
        synchronize: true,  // Be cautious in production; can set to false in prod
      }),
      inject: [ConfigService],  // Inject the ConfigService here
    }),
    ConnectionModule,
    AuthModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
