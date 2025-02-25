import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from 'src/common/google-auth.service';

@Injectable()
export class EmailService {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  // Fetch emails from Gmail
  async getEmails() {
    const gmailClient = this.googleAuthService.getGmailClient();
    console.log('gmailClient',gmailClient.users.messages)
    const res = await gmailClient.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      // q: 'is:unread', // For example, filter unread emails
      maxResults: 10,
    });
    console.log('res.data',res.data)
    return (res.data.messages ?? []).map(message => ({
        id: message.id,
        threadId: message.threadId,
      }));
  }
}
