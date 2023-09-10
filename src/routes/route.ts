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
/*
router.get(`/delete/:id`, async (req, res) => {
    const { id } = req.params
    const Acharacter = await prisma.character.delete({
        where: { id: Number(id) },
   });
  })
  */
router.get('/delete/:id', FirstController.deletarPersonagens);


export { router as personagensRoutes };
