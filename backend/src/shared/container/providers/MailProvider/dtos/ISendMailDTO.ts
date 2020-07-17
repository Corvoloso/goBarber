import IParseMailTemplateDTO from "../../MailTemplateProvider/dtos/IParseMailTemplateDTO";

interface ISendMailContact {
  name: string;
  email: string;
};

export default interface ISendMailDTO {
  to: ISendMailContact;
  from?: ISendMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
};
