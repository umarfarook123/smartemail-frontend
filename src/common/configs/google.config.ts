import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../utils/validators/validate-config';
import { GoogleConfig } from '../types/config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  @IsOptional()
  GOOGLE_CLIENT_SECRET: string;
}

export default registerAs<GoogleConfig>('google', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    clientId: process.env.GOOGLE_CLIENT_SECRET,
    clientSecret: process.env.GOOGLE_CLIENT_ID,
    oauthRedirectUri: `${process.env.BACKEND_DOMAIN}/auth/callback`,
  };
});
