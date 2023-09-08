import { Request, Response } from 'express';
import * as mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'personagens',
  });


  export const listarPersonagens = async (req: Request, res: Response) => {
    try {
    // Execute uma consulta SQL para obter todos os personagens
    //const characters = connection.query('SELECT * FROM characters');
    //res.render('allCharacters', { characters });

    // Renderize a página HTML e envie os dados dos personagens
    res.render('allCharacters');
  } catch (error) {
    console.error('Erro ao obter personagens:', error);
    res.status(500).json({ error: 'Erro ao obter personagens' });
  }
};
