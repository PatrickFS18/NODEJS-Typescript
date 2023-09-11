
# NodeJS+typescript -> CRUD + API + MYSQL

## Requisitos

- Node.js v14.0 ou superior
- NPM (gerenciador de pacotes)
- NPX (opcional, mas recomendado para rodar scripts TypeScript)
- TypeScript (instalado globalmente ou localmente)

Banco de dados utilizado: mysql

## Instalação e configuração

1. Clone este repositório.
2. Execute `npm install` para instalar as dependências.
3. Adicione ao arquivo [.env] -> DATABASE_URL="sua-url-para-o-mysql"

 exemplo (3.): -> DATABASE_URL =  "mysql://root:@localhost:3306/personagens", Onde `personagens` é o banco de dados

## Migração do Banco de Dados

1. Execute as migrações do banco de dados, que criará a base de dados e as tabelas, usando o seguinte comando:


-> npx prisma migrate

## Uso

Para iniciar o servidor, execute o seguinte comando:

npx ts-node src/index.ts 

Isso iniciará o servidor usando o index.ts, configuração do server, e estará disponível em [http://localhost:3000].
