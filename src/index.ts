import * as dotenv from 'dotenv';
//config .env
dotenv.config();
import { insertCharacters } from './utils/fetchCharacters';
import { personagensRoutes } from './routes/route'; // Importe o roteador dos personagens
import express from 'express';
import path from 'path';

import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.json());

//inserir personagens no banco de dados

insertCharacters();
app.use('/', personagensRoutes);

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
