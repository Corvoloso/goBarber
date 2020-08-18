interface IMailConfig {
  driver: 'ethereal' | 'ses',

  defaults: {
    from: {
      email: string;
      name: string;
    }
  }

}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: 'igoralves.b18@corvoloso.com.br',
      name: 'Corvoloso'
    }
  }
} as IMailConfig;
