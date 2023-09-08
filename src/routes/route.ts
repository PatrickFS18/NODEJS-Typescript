import express from 'express';
import { Router } from 'express';

const router = Router();

const characters = /* Obter os dados dos personagens aqui */ [];

router.get('/', (req, res) => {
  res.render('personagens');
});

export { router as personagensRoutes };
