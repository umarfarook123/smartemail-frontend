import { Controller, Get, Query, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { GoogleAuthService } from 'src/common/google-auth.service';
import { GoogleAuthToken } from '../entities/google-auth-token.entity';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    @InjectRepository(GoogleAuthToken)
    private readonly tokenRepository: Repository<GoogleAuthToken>,
  ) {}

  // Route to initiate OAuth login
  @Get('login')
  login(@Res() res: Response) {
    const authUrl = this.googleAuthService.getAuthUrl();
    return res.redirect(authUrl);  // Redirect user to Google's OAuth 2.0 authorization page
  }

  // Route for Google's callback, exchange the code for tokens
  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    try {
      console.log(code)
      const tokens = await this.googleAuthService.getTokensFromCode(code);
      const tokenRecord = new GoogleAuthToken();
      tokenRecord.accessToken = tokens.access_token;
      tokenRecord.refreshToken = tokens.refresh_token;
      tokenRecord.expiresIn = tokens.expires_in;
      tokenRecord.tokenType = tokens.token_type;
      tokenRecord.scope = tokens.scope;
      tokenRecord.createdAt = new Date();
      tokenRecord.updatedAt = new Date();

    // Step 3: Save to database
    await this.tokenRepository.save(tokenRecord);

    // Step 4: Return a success response

      res.cookie('google_tokens', tokens);
      res.send('Tokens received, stored securely in the database!');
    } catch (error) {
      console.error('Error during OAuth callback:', error);
      res.status(500).send('Error during OAuth callback');
    }
  }
}
