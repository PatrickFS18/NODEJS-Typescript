import express from 'express';
import path from 'path';
import { insertCharacters } from './utils/fetchCharacters';
import { personagensRoutes } from './routes/route'; // Importe o roteador dos personagens

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

//inserir personagens no banco de dados

insertCharacters();
app.use('/', personagensRoutes);

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
