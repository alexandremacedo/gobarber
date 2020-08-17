# Recuperação de senha
**RF**

- O usuario deve poder recuperar sua senha informando seu email [  ]
- O usuario deve poder receber um email com instruçoes de recuperacao de senha
- O usuario deve poder resetar a senha

**RNF**

- Utilizar mailtrap para testar envios em ambiente em desenvolvimento
- Utilizar o Amazon SES para envios de emails em producao
- O envio de email deve acontecer em segundo plano (background job / queue)

**RN**

- O link enviado por email para recuperar senha para resetar senha, deve expirar em 2h
- O usuario precisa confirmar a nova senha ao reseta-lá

# Atualização do perfil

**RF**

- O usuario deve poder atualizar seus nome, email e senha

**RN**

- O usuário nao pode atualizar seu email para um email ja cadastrado
- Atualizar a senha do usuario
  - O usuario deve informa a nova senha
  - O usuario deve confirmar a nova senha

# Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia especifico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações nao lidas

**RNF**

- Os agendamentos do prestador devem ser armazenados em cache
- As notificaçoes do prestador devem ser armazenadas no MongoDB
- As notificaçòes do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN**

- A notificação deve ter um status de lida ou nao lida

# Agendamento de serviços

**RF**

- O usuario deve listar todos os prestadores de serviço cadastrados
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador
- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador
- O usuario deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h as 18h (Primeiro as 8h, ultimo as 19h)
- O usuario nao pode agendar em um horario ja ocupado
- O usuario nao pode agendar em um horario que ja passou consigo
