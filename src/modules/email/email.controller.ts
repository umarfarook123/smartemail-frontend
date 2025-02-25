import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // Route to get Gmail emails
  @Get()
  async getEmails() {
    const emails = await this.emailService.getEmails();
    return emails;
  }
}
