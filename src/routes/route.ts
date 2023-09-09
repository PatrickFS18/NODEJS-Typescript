import { Router } from 'express';
import { PrismaClient } from '../../prisma/generated/client'; 

const router = Router();

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    // Use o Prisma Client para buscar todos os personagens
    const characters = await prisma.character.findMany();

    // Renderize a página 'allCharacters' e passe os personagens para ela
    res.render('allCharacters', { characters });
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    res.status(500).send('Erro ao buscar personagens');
  } finally {
    // Certifique-se de desconectar o Prisma Client após o uso
    await prisma.$disconnect();
  }
});

export { router as personagensRoutes };
