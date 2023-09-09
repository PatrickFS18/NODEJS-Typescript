import { Request, Response } from 'express';

import { PrismaClient } from '../../prisma/generated/client'; 

const prisma = new PrismaClient();

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
