import axios from 'axios';
import { PrismaClient } from '../../prisma/generated/client'; 


const API_URL = 'https://rickandmortyapi.com/api/character';

const prisma = new PrismaClient();

export const insertCharacters = async () => {
  try {
    // solicitação à API
    const response = await axios.get(API_URL);

    const charactersData = response.data.results;
    
    for (const characterData of charactersData) {

      const { name, species, status, type, gender, origin, location, image, created, url } = characterData;

      await prisma.character.create({
        data: {
          name,
          species,
          status,
          type,
          gender,
          originName: origin.name,    
          originLink: origin.url,    
          locationName: location.name, 
          locationLink: location.url, 
          image,
          created,
          url,
        },
      });

      console.log(`Personagem ${name} inserido com sucesso no banco de dados.`);
    
    }

    console.log('Personagens inseridos com sucesso no banco de dados.');

  } catch (error) {

    console.error('Erro ao inserir personagens:', error);

  } finally {

    await prisma.$disconnect();

  }
};

