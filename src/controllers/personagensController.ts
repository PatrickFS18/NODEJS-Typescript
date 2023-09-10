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
  }

  //deletar personagem

  public async deletarPersonagens(req: Request, res: Response) {
    const characters = prisma.character.findMany();

    const { id } = req.params;
    const Acharacter = await prisma.character.delete({
        where: { id: Number(id) },
    });
    
    res.redirect("/");
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
    } catch (error) {
      console.error("Erro ao obter personagens:", error);

      res.status(500).json({ error: "Erro ao obter personagens" });
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


  try {
    const updatedCharacter = await prisma.character.update({
      where: { id: parseInt(id) },
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
  } catch (error) {
    console.error("Erro ao atualizar personagem:", error);
    res.status(500).send("Erro ao atualizar personagem");
  }
};
}

export const FirstController = new firstController();


