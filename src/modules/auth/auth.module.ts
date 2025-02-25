import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleAuthService } from 'src/common/google-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthToken } from '../entities/google-auth-token.entity';
import { ConnectionModule } from '../database/connection.module';

@Module({

    imports:[
    TypeOrmModule.forFeature([GoogleAuthToken]),
    ConnectionModule
    ],
  controllers: [AuthController],
  providers: [GoogleAuthService]
})
export class AuthModule {}
