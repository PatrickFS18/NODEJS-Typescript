import {
  Request,
  Response
} from "express";
import {
  PrismaClient
} from "../../prisma/generated/client";

import isUrl from 'is-url'; // Para validação de URL

const prisma = new PrismaClient();


//Função de validação dos campos de editar e criar personagem

async function validatorCharacters(req: Request, res: Response) {
  const id = parseInt(req.body.id);

  const character = await prisma.character.findFirst({
     where: {
        id: id
     }
  });

  const species = req.body.species;
  const status = req.body.status;
  const gender = req.body.gender;
  const image = req.body.image;
  const url = req.body.url;

  // Verifique se a URL da imagem é válida
  if (image && (!isUrl(image) || !image.toLowerCase().endsWith('.jpeg'))) {
     res.render("editCharacters", {
        character,
        error: 'URL da imagem inválida.'
     });
  }

  // Verifique se o URL é válido
  if (url && !isUrl(url)) {
     res.render("editCharacters", {
        character,
        error: 'URL inválida.'
     });
  }

  // Verifique se o status é válido (por exemplo, "Alive", "Dead" ou "unknown")
  const validStatusValues = ['alive', 'dead', 'unknown'];
  if (!validStatusValues.includes(status.toLowerCase())) {
     res.render("editCharacters", {
        character,
        error: 'Status inválido.'
     });
  }

  // Verifique se o gênero é válido (apenas "male" ou "female" permitidos)
  const validGenderValues = ['male', 'female'];
  if (!validGenderValues.includes(gender.toLowerCase())) {
     res.render("editCharacters", {
        character,
        error: 'Gênero inválido.'
     });
  }

  // Verifique se o tipo é válido (apenas "human" ou "alien" permitidos)
  const validTypeValues = ['human', 'alien'];
  if (!validTypeValues.includes(species.toLowerCase())) {
     res.render("editCharacters", {
        character,
        error: 'Espécie inválida.'
     });
  }
  const validation = true;
  return validation; //Campos validados e aprovados para edição,continuará execução lógica no controller: editarPersonagens
}
// Função para paginação da tela principal

async function paginateCharacters(req: Request) {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const pageSize = 15;
  const skip = (page - 1) * pageSize;

  const characters = await prisma.character.findMany({
     skip,
     take: pageSize,
  });

  // Calcula o número total de páginas com base na contagem total de personagens
  const totalCharacters = await prisma.character.count();
  const totalPages = Math.ceil(totalCharacters / pageSize);

  return {
     characters,
     totalPages,
     page: page
  };
}

//minha class controller, firstController

class firstController {

  //------------------Pagina Inicial---------------------//


  public async listarPersonagens(req: Request, res: Response) {

     try {

        const {
           characters,
           totalPages,
           page
        } = await paginateCharacters(req);

        res.render('allCharacters', {
           characters,
           page: page,
           totalPages,
        });

     } catch (error) {

        res.render('errorPage', {
           err: error
        });

     } finally {
        await prisma.$disconnect();
     }
  }

  //------------------edit page init---------------------//

  public async EditPageInit(req: Request, res: Response) {

     try {

        const characterId = req.body.id;

        const character = await prisma.character.findUnique({
           where: {
              id: Number(characterId),
           },
        });

        res.render("editCharacters", {
           character
        });

     } catch (error) {

        const err = {
           success: false,
           error: "Ocorreu um erro para editar!",
        };

        res.render("errorPage", {
           err
        });

     } finally {

        await prisma.$disconnect();

     }
  }

  //------------------Add page init---------------------//

  public InitPageAdd(req: Request, res: Response) {

     res.render("addCharacters");

  }

  //------------------Deletar Personagem---------------------//

  public async deletarPersonagens(req: Request, res: Response) {

     try {

        const {
           id
        } = req.params;
        const Acharacter = await prisma.character.delete({
           where: {
              id: Number(id)
           },
        });
        const characters = prisma.character.findMany();

        const successMessage = "Exclusão feita com sucesso";
        res.redirect("/");
     } catch (error) {

        const err = {
           success: false,
           error: "Erro ao excluir o personagem.",
        };

        res.render("errorPage", {
           err
        });

     } finally {

        await prisma.$disconnect();

     }
  }


  //------------------Inserir Personagem---------------------//

  public async inserirPersonagens(req: Request, res: Response) {
     try {
        const {
           characters,
           totalPages,
           page
        } = await paginateCharacters(req);

        let date = new Date();
        const id = req.body.id;
        const name = req.body.name;
        const species = req.body.species;
        const status = req.body.status;
        const type = req.body.type;
        const gender = req.body.gender;
        const originName = req.body.originName;
        const originLink = req.body.originLink;
        const locationName = req.body.locationName;
        const locationLink = req.body.locationLink;
        const image = req.body.image;
        const created = date.toISOString();
        const url = req.body.url;

        const newCharacter = await prisma.character.create({
           data: {
              name,
              species,
              status,
              type,
              gender,
              originName,
              originLink,
              locationName,
              locationLink,
              image,
              created,
              url,
           },
        });
        const successMessage = "Personagem " + name + " Adicionado com Sucesso";
        res.render('allCharacters', {
           characters,
           page: page,
           totalPages,
           successMessage
        });
     } catch (error) {

        const err = {
           error
        };
        res.render("errorPage", {
           err
        });

     } finally {

        await prisma.$disconnect();

     }
  }


  //------------------Editar Personagem---------------------//

  public async editarPersonagens(req: Request, res: Response) {

     try {

        const {
           characters,
           totalPages,
           page
        } = await paginateCharacters(req);
        const validation = await validatorCharacters(req, res);

        const id = req.body.id;
        const name = req.body.name;
        const species = req.body.species;
        const status = req.body.status;
        const type = req.body.type;
        const gender = req.body.gender;
        const originName = req.body.originName;
        const originLink = req.body.originLink;
        const locationName = req.body.locationName;
        const locationLink = req.body.locationLink;
        const image = req.body.image;
        const created = req.body.created;
        const url = req.body.url;

        const updatedCharacter = await prisma.character.update({
           where: {
              id: Number(id)
           },
           data: {
              name,
              species,
              status,
              type,
              gender,
              originName,
              originLink,
              locationName,
              locationLink,
              image,
              created,
              url,
           },
        });
        const successMessage = "Edição feita com sucesso";
        if (updatedCharacter && validation == true) {
           res.render("allCharacters", {
              characters,
              totalPages,
              page,
              successMessage
           });
        } else {
           const err = {
              success: false,
              error: "Erro ao editar o personagem!",
           };
           const character = await prisma.character.findFirst({
              where: {
                 id: id
              }
           });
           res.render("editCharacters", {
              character,
              err: err.error
           });
        }

     } catch (error) {

        const err = {
           success: false,
           error: "Erro ao editar o personagem.",
        };

        res.render("errorPage", {
           err
        });

     } finally {

        await prisma.$disconnect();

     }
  }
}

export const FirstController = new firstController();