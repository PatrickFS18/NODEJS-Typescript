import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

//minha class controller, firstController
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

  return { characters, totalPages, page: page };
}

class firstController {
   
  //------------------Pagina Inicial---------------------//
  

   public async listarPersonagens(req: Request, res: Response) {

    try {

      const { characters, totalPages, page } = await paginateCharacters(req);

      res.render('allCharacters', {
        characters,
        page: page,
        totalPages,
      });

    } catch (error) {
      console.error('Erro ao listar personagens:', error);
      res.status(500).send('Erro ao listar personagens');
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

      res.render("editCharacters", { character });

    } catch (error) {

      const err = {
        success: false,
        error: "Ocorreu um erro!. Aguarde alguns instantes..",
      };

      console.error("Ocorreu um erro!", error);
      res.render("errorPage", { err });

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

      const { id } = req.params;
      const Acharacter = await prisma.character.delete({
        where: { id: Number(id) },
      });
      const characters = prisma.character.findMany();

      const successMessage="Exclusão feita com sucesso";
      res.redirect("/");
    } catch (error) {

      const err = {
        success: false,
        error: "Erro ao excluir o personagem. Aguarde alguns instantes..",
      };

      console.error("Erro ao excluir o personagem:", error);
      res.render("errorPage", { err });

    } finally {

      await prisma.$disconnect();

    }
  }

 

  //------------------Inserir Personagem---------------------//

  public async inserirPersonagens(req: Request, res: Response) {
    try {
            const { characters, totalPages, page } = await paginateCharacters(req);

      let a = new Date();
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
      const created=a.toISOString();
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
     const successMessage="Personagem "+name+" Adicionado com Sucesso";
res.render('allCharacters', {
        characters,
        page: page,
        totalPages,
        successMessage
      });
    } catch (error) {

      const err={ error };
      res.render("errorPage",{ err });

    } finally {

      await prisma.$disconnect();

    }
  }

 

  //------------------Editar Personagem---------------------//

  public async editarPersonagens(req: Request, res: Response) {

    try {
    const characters = prisma.character.findMany();

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
        where: { id: Number(id) },
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
    const successMessage="Edição feita com sucesso";
    res.render("allCharacters", { characters, successMessage });
    
  } catch (error) {

      const err = {
        success: false,
        error: "Erro ao editar o personagem. Aguarde alguns instantes..",
      };

      console.error("Erro ao editar o personagem:", error);
      res.render("errorPage", { err });
    
    } finally {

      await prisma.$disconnect();

    }
  }
}

export const FirstController = new firstController();
