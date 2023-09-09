import { Request, Response } from 'express';

import { PrismaClient } from '../../prisma/generated/client'; 

const prisma = new PrismaClient();

//--------------------------------------------------------------------//

// Listar Personagem

//--------------------------------------------------------------------//



export const listarPersonagens = async (req: Request, res: Response) => {

  try {

    const characters = await prisma.character.findMany();

    res.render('allCharacters', { characters });
    
  } catch (error) {

    console.error('Erro ao obter personagens:', error);

    res.status(500).json({ error: 'Erro ao obter personagens' });

  } finally {
    
    await prisma.$disconnect();

  }
};

//--------------------------------------------------------------------//

//Adicionar Personagem

//--------------------------------------------------------------------//

export const adicionarPersonagens = async (req: Request, res: Response) => {
  try {
    const { name, species, status, type, gender, originName, originLink, locationName, locationLink, location_id, image, created, url } = req.body;

    // Valide os dados, se necessário

    const newCharacter = await prisma.character.create({
      data: {
        name,
        species,
        status,
        type,
        gender,
        originName,
        originLink,
        locationName,
        locationLink,
        image,
        created,
        url,
      },
    });
    console.log(newCharacter);
    res.render('allCharacters');
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    res.status(500).json({ error: 'Erro ao criar personagem' });
  }
};

//--------------------------------------------------------------------//

//Editar Personagem

//--------------------------------------------------------------------//


export const editarPersonagens = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, species, status, type, gender, originName, originLink, locationName, locationLink, location_id, image, created, url } = req.body;

    // Valide os dados, se necessário

    const updatedCharacter = await prisma.character.update({
      where: { id: parseInt(id) },
      data: {
        name,
        species,
        status,
        type,
        gender,
        originName,
        originLink,
        locationName,
        locationLink,
        image,
        created,
        url,
      },
    });

    res.render('allCharacters');
  } catch (error) {
    console.error('Erro ao editar personagem:', error);
    res.status(500).json({ error: 'Erro ao editar personagem' });
  }
};



//--------------------------------------------------------------------//

//Deletar Personagem

//--------------------------------------------------------------------//



export const deletarPersonagens = async (req: Request, res: Response) => {
  try {
    const  id  = req.body.id;

    // Exclua o personagem com base no ID
    await prisma.character.delete({
      where: {
        id: Number(id),
      },
    });

    res.render('allCharacters'); // Sem conteúdo
  } catch (error) {
    console.error('Erro ao excluir personagem:', error);
    res.status(500).json({ error: 'Erro ao excluir personagem' });
  }
};



//--------------------------------------------------------------------//


//Init editar Page

//--------------------------------------------------------------------//


export const initPageEditar = async (req: Request, res: Response) => {
  try {
    const characterId = req.body.id;

    // Substitua 'Character' pelo nome correto da sua entidade no Prisma
    const character = await prisma.character.findUnique({
      where: {
        id: Number(characterId),
      },
    });

    if (!character) {
      // Se o personagem não for encontrado, você pode redirecionar o usuário ou exibir uma mensagem de erro
      return res.status(404).send('Personagem não encontrado.');
    }

    res.render('editCharacters', { character });
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    res.status(500).send('Erro ao buscar personagem');
  }
};

