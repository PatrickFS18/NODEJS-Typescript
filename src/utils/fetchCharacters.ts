// Importe as bibliotecas necessárias
import axios from 'axios';
import * as mysql from 'mysql2';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const insertCharacters = async () => {
  try {
    // Crie uma conexão com o banco de dados MySQL
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Insira a senha do seu banco de dados, se aplicável
      database: 'personagens',
    });

    // Faça a solicitação à API
    const response = await axios.get(API_URL);
    const charactersData = response.data.results;

    // Itere sobre os personagens e insira-os no banco de dados
    for (const characterData of charactersData) {
      const { name, species, status, type, gender, origin, location, image, created, url } = characterData;

      // Use uma consulta SQL para inserir os dados em todas as colunas
      const query = `
        INSERT INTO characters (name, species, status, type, gender, origin_id, location_id, image, created, url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      connection.query(query, [name, species, status, type, gender, origin.id, location.id, image, created, url], (err, results) => {
        if (err) {
          console.error('Erro ao inserir personagem:', err);
        } else {
          console.log(`Personagem ${name} inserido com sucesso no banco de dados.`);
        }
      });
    }

    // Feche a conexão com o banco de dados
    connection.end();

    console.log('Personagens inseridos com sucesso no banco de dados.');
  } catch (error) {
    console.error('Erro ao inserir personagens:', error);
  }
};

// Execute a função para inserir personagens
insertCharacters();
