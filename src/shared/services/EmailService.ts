import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface Mail {
  to: string;
  subject: string;
  variables: ITemplateVariables;
  path: string;
}

class EmailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async sendMail({ path, subject, to, variables }: Mail) {
    const templateFile = fs.readFileSync(path).toString('utf-8');
    const mailTemplate = handlebars.compile(templateFile);
    const html = mailTemplate(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'SalesAPI <noreply@salesapi.com>',
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new EmailService();
