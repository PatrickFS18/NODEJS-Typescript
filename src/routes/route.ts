import { Router } from 'express';
import { PrismaClient } from '../../prisma/generated/client'; 
import { editarPersonagens, listarPersonagens,adicionarPersonagens,deletarPersonagens, initPageEditar } from '../controllers/personagensController';

const router = Router();
const prisma = new PrismaClient();


router.get('/', async (req, res) => listarPersonagens);

router.post('/editPage', initPageEditar);

router.post('/characters', async (req, res) => adicionarPersonagens);

router.put('/edit/:id', async (req, res) => editarPersonagens);

router.delete('/delete', async (req, res) => deletarPersonagens);


export { router as personagensRoutes };
