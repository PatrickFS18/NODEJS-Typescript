import { createConnection } from 'typeorm';

async function testDatabaseConnection() {
  try {
    // Crie uma instância de conexão com base na configuração do TypeORM (ormconfig.json)
    const connection = await createConnection();

    // Conexão bem-sucedida
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Feche a conexão após o teste
    await connection.close();
  } catch (error) {
    // Erro na conexão
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Execute a função para testar a conexão com o banco de dados
testDatabaseConnection();
