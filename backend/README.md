# Engenharia de Requisitos

## Recuperação de Senha

**RF - Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com a instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF - Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em email de desenvolvimento (Serviço de Fakemail)
- Utilizar o Amazon SES para envios em produção;
- O envio de email deve acontecer em segundo plano (background job);

**RN - Regras de Negócio**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar uma nova senha ao reseta-la;

## Atualização do Perfil do Usuaŕio

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuário não deve poder alterar seu email para um email já utilizado;
- Para atualizar de senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;

## Agendamento de Serviços

**RF**

- O Usuário deve poder listar todos os prestadores cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;

**RNF**
- Armazenar a listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1 hora exatamente
- Os agendamentos devem estar disponíveis entre as 8h às 18h (Primeiro horário às 8h, último às 17h);
- O usuário não pode agendar em um horário já existente;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

## Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidar

**RNF**

- Os agendamentos do prestador em dia deve ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações devem ser enviadas em tempo-real via Socket.io;

**RN**

- A notificação deve possuir um status de lida e não-lida para o prestador controlar;
