import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GoogleAuthService {
  private oauth2Client;

  constructor() {
    // Set up OAuth2 client with your Google credentials
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
  }

  // Step 1: Generate the Google OAuth URL
  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly', // Read emails
      'https://www.googleapis.com/auth/gmail.modify',   // Modify emails (mark read, move, etc.)
    ];
    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',  // "offline" gives you a refresh token
      scope: scopes,
    });
    return url;
  }

  // Step 2: Handle OAuth2 callback and exchange code for tokens
  async getTokensFromCode(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    console.log('Tokens:', tokens);

  if (!tokens.expires_in) {
    tokens.expires_in = 3600; // Set a default value of 1 hour
  }
    this.oauth2Client.setCredentials(tokens);
    return tokens;
  }

  // Step 3: Get Gmail API client with the current OAuth2 credentials
  getGmailClient() {
    return google.gmail({ version: 'v1', auth: this.oauth2Client });
  }

  async  refreshTokenIfNeeded() {
    const tokens = this.oauth2Client.credentials;
    if (tokens.refresh_token) {
      const { tokens: refreshedTokens } = await this.oauth2Client.refreshAccessToken();
      this.oauth2Client.setCredentials(refreshedTokens);
    }
  }
}
