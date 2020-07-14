import IMailProvider from '../models/IMailProvider';

interface IMails {
  to: string;
  body: string;
};

export default class FakeMailProvider implements IMailProvider {
  private mails: IMails[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.mails.push({
      to,
      body
    })
  }
}
