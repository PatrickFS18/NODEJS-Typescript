import { Router } from 'express';
import { PrismaClient } from '../../prisma/generated/client'; 
import { FirstController } from '../controllers/personagensController';
const router = Router();
const prisma = new PrismaClient();


router.get('/', FirstController.listarPersonagens);

//router.post('/editPage', initPageEditar);
router.post('/editPage', FirstController.EditPageInit);

router.post('/characters', FirstController.inserirPersonagens);

router.post('/editCharacter', FirstController.editarPersonagens);

router.delete('/delete', FirstController.deletarPersonagens);


export { router as personagensRoutes };
