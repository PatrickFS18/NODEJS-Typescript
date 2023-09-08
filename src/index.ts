import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';

import { personagensRoutes } from './routes/route'; // Importe o roteador dos personagens

const app = express();
const port = process.env.PORT || 3000;

// Configure o Express para usar o mecanismo de modelo Handlebars
app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use('/', personagensRoutes);

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
