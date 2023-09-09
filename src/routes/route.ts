import { Router } from 'express';
import mysql from 'mysql2/promise';

const router = Router();

const dbConfig ={
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'personagens',
};
router.get('/', async (req, res) => {
  try {

    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute('SELECT * FROM `characters`');

    await connection.end();

    res.render('allCharacters', { characters: rows });
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    res.status(500).send('Erro ao buscar personagens');
  }
});
export { router as personagensRoutes };
