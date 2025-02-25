import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from '../database/connection.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { GoogleAuthService } from 'src/common/google-auth.service';

@Module({
    imports:[
    ConnectionModule
    ],
  controllers: [EmailController],
  providers:[EmailService,GoogleAuthService]
})
export class EmailModule {}
