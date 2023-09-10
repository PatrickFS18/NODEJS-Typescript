import { Request, Response } from "express";

import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

class firstController {
  //edit page init

  public async EditPageInit(req: Request, res: Response) {
    const characterId = req.body.id;
    const character = await prisma.character.findUnique({
      where: {
        id: Number(characterId),
      },
    });
    res.render("editCharacters", { character });
    await prisma.$disconnect();
    }

  //deletar personagem

  public async deletarPersonagens(req: Request, res: Response) {
    try{
    const characters = prisma.character.findMany();

    const { id } = req.params;
    const Acharacter = await prisma.character.delete({
        where: { id: Number(id) },
    });
    
    res.redirect("/");
  }catch(error) {
    const err={
      success: false,
      error: 'Erro ao excluir o personagem. Aguarde alguns instantes..',
    };
      console.error('Erro ao excluir o personagem:', error);
      res.render("errorPage",{ err });
  }
  finally {
      await prisma.$disconnect();
    }
  }

  //inserir Personagem
  public async inserirPersonagens(req: Request, res: Response) {
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

    const newCharacter = prisma.character.create({
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
    
    res.render("allCharacters", { characters });
    
  }

  public async listarPersonagens(req: Request, res: Response) {
    try {
      const characters = await prisma.character.findMany();

      res.render("allCharacters", { characters });
    } catch(error) {
      const err={
        success: false,
        error: 'Erro ao listar os personagens. Aguarde alguns instantes..',
      };
        console.error('Erro ao listar o personagem:', error);
        res.render("errorPage",{ err });
    } finally {
      await prisma.$disconnect();
    }
  }

public async editarPersonagens(req: Request, res: Response) {
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

  console.log('id:', id);
  console.log('name:', name);
  console.log('species:', species);
  console.log('status:', status);
  console.log('type:', type);
  console.log('gender:', gender);
  console.log('originName:', originName);
  console.log('originLink:', originLink);
  console.log('locationName:', locationName);
  console.log('locationLink:', locationLink);
  console.log('image:', image);
  console.log('created:', created);
  console.log('url:', url);
  

  try {
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

    res.redirect("/");
  } catch(error) {
    const err={
      success: false,
      error: 'Erro ao editar o personagem. Aguarde alguns instantes..',
    };
      console.error('Erro ao editar o personagem:', error);
      res.render("errorPage",{ err });
  }
  finally {
    await prisma.$disconnect();
  }
};
}

export const FirstController = new firstController();


