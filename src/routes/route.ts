import { Router } from 'express';
import { PrismaClient } from '../../prisma/generated/client'; 
import { FirstController } from '../controllers/personagensController';

const router = Router();
const prisma = new PrismaClient();

// -----------------------GET-------------------------------//

router.get('/', FirstController.listarPersonagens);
router.get('/addCharacter', FirstController.InitPageAdd);

//--Delete--//
router.get('/delete/:id', FirstController.deletarPersonagens);

// ----------------------POST-------------------------------//

router.post('/editPage', FirstController.EditPageInit);
router.post('/addCharacter', FirstController.inserirPersonagens);
router.post('/editCharacter', FirstController.editarPersonagens);



export { router as personagensRoutes };
